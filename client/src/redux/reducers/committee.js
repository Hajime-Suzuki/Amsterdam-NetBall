import { GET_COMMITTEE, ADD_MESSAGE, DELETE_MESSAGE } from "../actions/committees"

export default (state = {}, { type, payload }) => {
  switch (type) {

    case GET_COMMITTEE:
      return payload

    case ADD_MESSAGE:
      const {committee, ...message} = payload;
      const newMessages = [...state.messages, message]
      return {...state, messages: newMessages }

    case DELETE_MESSAGE:
      const remainingMessages = state.messages.filter(
        message => message.id !== payload
      )
      return {...state, messages: remainingMessages }
    default:
      return state

  }
}
