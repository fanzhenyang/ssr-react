import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import indexReducer from './index';
import userReducer from './user';

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

// const store = createStore(
//   reducer,
//   applyMiddleware(thunk)
// )

// export default store;

// 服务端使用
export const getServerStore = () => {
  // 通过server的dispatch来获取和充实
  return createStore(
    reducer,
    applyMiddleware(thunk)
  )
}

// 客户端使用
export const getClientStore = () => {
  // 通过window.__context来获取数据
  // 游览器端
  const defaultState = window.__context ? window.__context : {}
  return createStore(
    reducer,
    defaultState,
    applyMiddleware(thunk)
  )
}