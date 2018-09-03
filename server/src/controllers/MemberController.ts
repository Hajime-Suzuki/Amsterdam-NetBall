import { Activity } from "./../entities/Activity"
import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser,
  QueryParams,
  Patch,
  BadRequestError
} from "routing-controllers"
import { getRepository, Brackets } from "typeorm"
import { Member } from "../entities/Member"
import { Position } from "../entities/Position"
import * as moment from "moment"

@JsonController()
export default class MemberController {
  @Post("/signup")
  signup(@Body() data: Member) {
    console.log(data)
    return Member.create(data).save()
  }

  @Authorized()
  @Get("/members/:id([0-9]+)")
  getUser(@Param("id") id: number, @CurrentUser() user: Member) {
    const member = Member.findOne(id)
    return member
  }

  @Authorized()
  @Patch("/members/:memberId([0-9]+)/:activityId([0-9]+)")
  async updateUser(
    @Param("memberId") memberId: number,
    @Param("activityId") activityId: number,
    @CurrentUser() user: Member | null
  ) {
    const member = await Member.findOne(memberId)
    const activity = await Activity.findOne(activityId)
    member.activities.push(activity)
    await member.save()
    return member
  }

  // @Authorized()
  @Get("/members")
  async allUsers(
    @QueryParams() params: any,
    @CurrentUser() user: Member | null
  ) {
    const name = params.name ? params.name : "%"
    let query = Member.createQueryBuilder("member")
      .leftJoinAndSelect("member.positions", "positions")
      .leftJoinAndSelect("member.committees", "committees")
      .leftJoinAndSelect("member.team", "team")
      .leftJoinAndSelect("member.activities", "activity")
      .where(
        new Brackets(qb => {
          qb.where("member.firstName ILIKE :name", {
            name: `%${name}%`
          }).orWhere("member.lastName ILIKE :name", { name: `%${name}%` })
        })
      )

    if (params.email) {
      query = query.andWhere("member.email ILIKE :email", {
        email: `%${params.email}%`
      })
    }
    if (params.city) {
      query = query.andWhere("member.city ILIKE :city", {
        city: `%${params.city}%`
      })
    }
    if (params.isCurrentMember) {
      query = query.andWhere("member.isCurrentMember = :isCurrentMember", {
        isCurrentMember: params.isCurrentMember
      })
    }
    if (params.dateOfBirth) {
      const timestamp = new Date(params.dateOfBirth)
      query = query.andWhere("member.dateOfBirth = :dateOfBirth", {
        dateOfBirth: timestamp
      })
    }
    if (params.startDate) {
      const timestamp = new Date(params.startDate)
      query = query.andWhere("member.startDate = :startDate", {
        startDate: timestamp
      })
    }
    if (params.endDate) {
      const timestamp = new Date(params.endDate)
      query = query.andWhere("member.endDate = :endDate", {
        endDate: timestamp
      })
    }
    if (params.positions) {
      // const allPositions = params.positions.split(',')
      query = query.andWhere("positions.id IN (:...names)", {
        names: params.positions.split(",")
      })
    }
    if (params.committees) {
      const allCommittees = params.committees.split(",")
      query = query.andWhere("committees.id IN (:...ids)", {
        ids: allCommittees
      })
    }
    if (params.teams) {
      query = query.andWhere("team.id IN (:...teams)", {
        teams: params.teams.split(",")
      })
    }
    if (params.role) {
      query = query.andWhere("member.role.id = :role", { role: params.role })
    }

    if (params.currentMember) {
      query = query.andWhere(
        "member.endDate > :date AND member.isCurrentMember = :membership",
        { date: new Date(), membership: true }
      )
    }

    const result = await query.getMany()
    const count = result.length

    return { members: result, count }
  }

  @Get("/test")
  async test() {
    const members = await Member.find()
    const now = new Date()
    members.forEach(u => {
      const activities = u.isAttended

      const endedActivity = activities.filter(act => act.activity.endTime < now)
      if (!endedActivity.length) return (u.attendanceRate = null)

      const totalAttended = endedActivity.filter(act => act.isAttended === true)

      u.attendanceRate = totalAttended.length / endedActivity.length

      if (!u.attendanceRate) return

      const a = totalAttended.reduce((points, act) => {
        // console.log(act)

        const diff = moment(act.activity.endTime).diff(
          moment(act.activity.startTime),
          "hours"
        )

        return (points += diff)
        // return points
      }, 0)
      console.log(a)
    })

    // await Member.save(members)

    return "updated"
  }
}
