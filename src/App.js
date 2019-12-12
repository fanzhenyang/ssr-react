import React, { Fragment, useState } from 'react';

function App(props) {
  const [count, setCount] = useState(1) 
  return (
    <Fragment>
      <h1>hello,{props.title}! {count}</h1>
      <button onClick={() => setCount(count + 1)}>add</button>
    </Fragment>
  )
}

export default <App title="你好，开课吧，很高兴学习新的知识" />;