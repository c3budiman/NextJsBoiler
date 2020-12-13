//if you want a custom express server modify package.json
//"dev": "next dev",
// to :
//"dev": "node src/server.js",

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


//express custom server
//well you need pm2 or something if you want to develop with express cause it wont hot reload itself.
app.prepare().then(() => {
    const server = express()

    require('./backend/home')(server);

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})