//this is an example of a custom node server in next.js with elastic apm on it.

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { url } = require('inspector')

const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()

const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)

        if (process.env.ENABLE_LOGGING_APM == "1") {
            try {
                var agent = require('elastic-apm-node');

                if (!agent.isStarted()) {
                    agent.start({
                        active: true,
                        serviceName: process.env.APPNAME,
                        secretToken: process.env.APM_TOKEN || "",
                        serverUrl: process.env.APM_SERVER_HOST,
                        captureBody: 'all'
                    })
                }

                if (req.url.substring(0, 4) == "/api") {
                    console.log(req.method + " " + req.url)
                    agent.setTransactionName(req.method + " " + req.url)
                }

            } catch (error) {
                console.log(error)
            }
        }

        handle(req, res, parsedUrl)
    }).listen(port, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:' + port)
    })
})
