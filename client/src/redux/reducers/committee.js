import { GET_COMMITTEE, ADD_MESSAGE, DELETE_MESSAGE, EDIT_MESSAGE } from "../actions/committees"

export default (state = {}, { type, payload }) => {
  switch (type) {

    case GET_COMMITTEE:
      return payload

    case ADD_MESSAGE:
      const {committee, ...message} = payload;
      const newMessages = [...state.messages, message]
      return {...state, messages: newMessages }

    case EDIT_MESSAGE:
      console.log('payload', payload)
      const editedMessages = state.messages.map(
        message => {
          if (message.id === payload.id) {
            return payload
          }
          return message
        }
      )
      return {...state, messages: editedMessages }

    case DELETE_MESSAGE:
      const remainingMessages = state.messages.filter(
        message => message.id !== payload
      )
      return {...state, messages: remainingMessages }
    default:
      return state

  }
}
