import { baseUrl } from '../../constants'
export const GET_FILTER_OPTION = 'GET_FILTER_OPTION'

export const getFilterOption = () => async dispatch => {
  const data = await fetch(`${baseUrl}/metadata`).then(res => res.json())
  dispatch({
    type: GET_FILTER_OPTION,
    payload: data
  })
}
