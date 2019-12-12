import React from 'react';
import { renderToString } from 'react-dom/server';
import exporess from 'express';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/store'
import App from '../src/App';

const app = exporess();
app.use(exporess.static('public'))

app.get('*', (req, res) => {
  // const Page = <App title="开课吧"></App>

  // 把react组件，解析成html
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        { App }
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
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
})

app.listen(8090, () => {
  console.log('监听完毕')
})