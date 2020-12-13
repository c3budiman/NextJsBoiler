# NextJsBoiler
Boiler Template for next js project - by c3budiman.

Demo URL : https://next-js-boiler.vercel.app/
<br>
API Documentation : https://documenter.getpostman.com/view/3745523/TVsoGVX2

What It Contains?
- custom server if you want to enabled, just go to pages/custom-server-express.js or pages/custom-server-node.js 
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

What my next goal for this boiler template?
- integrating firebase
- adding example of crud data in frontend.
- adding example of ssg and ssr.

How to use?
1. copy .env.example to .env
2. fill all the .env
3. npm install
3. start dev using npm run dev
4. start build using npm run build
5. ship it on custom server or vercel or whatever it supports both serverless and custom server.
