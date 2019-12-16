import axios from 'axios';

// 首页逻辑
// actionType
const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
})

// 异步请求
export const getUserInfo = server => {
  return (dispatch, getState, axiosIntance) => {
    return axios.get('http://localhost:9090/api/user/info')
    // const { code } = res
    // if (code === 0 || code === 200) {
    //   const { list } = res.data
    //   return dispatch(changeList(list))
    // }
      .then(res => {
        const { data } = res.data
        dispatch(changeUserInfo(data))
      })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      console.log(action.data)
      const newState = {
        ...state,
        userInfo: action.data
      }
      return newState
    default:
      return state
      
  }
}