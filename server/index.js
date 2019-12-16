import React from 'react';
import { renderToString } from 'react-dom/server';
import exporess from 'express';
import { StaticRouter, matchPath, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getServerStore } from '../src/store/store'
import routes from '../src/App';
import Header from '../src/component/Header';

const store = getServerStore();
const app = exporess();
app.use(exporess.static('public'))

app.get('*', (req, res) => {
  // 获取根据路由渲染的组件，并且拿到loadData方法 获取数据
  // const Page = <App title="开课吧"></App>

  // 存储网络请求
  const promises = [];
  // 路由匹配
  routes.some(route => {
    const match = matchPath(req.path, route);
    // if (match) promises.push(route.loadData(match));
    // return match;
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        promises.push(loadData(store))
      }
    }
  })

  // 当有借口错误直接抛出该异常
  const promiseCatchError = (promise) => {
    promise.catch( err => {
      console.log('err', err)
    })
  }

  // 等待所有网络请求
  Promise.all(promises.map(item => {
    return promiseCatchError(item)
  }))
    .then(() => {
      // 把react组件，解析成html
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <Header></Header>
            {/* { App } */}
            {routes.map(route => <Route {...route}></Route>)}
          </StaticRouter>
        </Provider>
      )
    
      res.send(`
        <html>
          <head>
            <meta charset="uft-8"/>
            <title>ssr react</title>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.__context = ${JSON.stringify(store.getState())}
            </script>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `)
    })
})

app.listen(8090, () => {
  console.log('监听完毕')
})