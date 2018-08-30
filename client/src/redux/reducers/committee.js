import { GET_COMMITTEE, ADD_MESSAGE } from "../actions/committees"

export default (state = {}, { type, payload }) => {
  switch (type) {

    case GET_COMMITTEE:
      return payload

    case ADD_MESSAGE:
      const {committee, ...message} = payload;
      const newMessages = [...state.messages, message]
      console.log('{...state, newMessages }', {...state, newMessages })
      return {...state, messages: newMessages }

    default:
      return state

  }
}
