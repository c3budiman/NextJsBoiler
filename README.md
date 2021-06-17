# NextJsBoiler

[![CodeFactor](https://www.codefactor.io/repository/github/c3budiman/nextjsboiler/badge/main)](https://www.codefactor.io/repository/github/c3budiman/nextjsboiler/overview/main)
[![Continous Integration NextJS Boiler](https://github.com/c3budiman/NextJsBoiler/actions/workflows/node.js.yml/badge.svg)](https://github.com/c3budiman/NextJsBoiler/actions/workflows/node.js.yml)

Boiler Template for next js project - by c3budiman.

Demo URL : <https://next-js-boiler.vercel.app/>

API Documentation : <https://documenter.getpostman.com/view/3745523/TVsoGVX2>

What It Contains?

- custom server if you want to enabled, just go to pages/custom-server-express.js or pages/custom-server-node.js
- Redux, Redux Thunk, Redux Middleware
- Bootstrap
- custom document
- custom app.js
- custom css (both global, and modular)
- environment variables
- UI testing (React and css)
- unit test for api routes (/api)
- Mongoose and Mongodb Integration (i prefer mongoose, but you can use mongodb too.)
- Mysql Integration
- integrating to session (redis)
- integrating to elastic-search for maintenance and logging api activity and response time (custom-server-node)
- integrating linter
- adding example of ssg, ssr, spa with redux.

What my next goal for this boiler template?

- websocket
- notification example / chat example
- integrating firebase
- adding example of crud data in frontend.

How to use?

1. copy .env.example to .env
2. fill all the .env
3. npm install
4. start dev using npm run dev
5. start build using npm run build
6. ship it on custom server or vercel or whatever it supports both serverless and custom server.
