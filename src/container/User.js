import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../store/user';

function User(props) {
  console.log(props.userInfo)
  return (
    <Fragment>
      <h1>你好{props.userInfo.name},你们是最棒的人{props.userInfo.best}</h1>
    </Fragment>
  )
}

User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}

export default connect(
  state => ({ userInfo: state.user.userInfo }),
  // { getUserInfo }
)(User)