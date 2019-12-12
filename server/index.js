import React from 'react';
import { renderToString } from 'react-dom/server';
import exporess from 'express';
import App from '../src/App';

const app = exporess();
app.use(exporess.static('public'))

app.get('/', (req, res) => {
  // const Page = <App title="开课吧"></App>

  // 把react组件，解析成html
  const content = renderToString(App)

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