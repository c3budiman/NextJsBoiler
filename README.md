# NextJsBoiler

[![CodeFactor](https://www.codefactor.io/repository/github/c3budiman/nextjsboiler/badge/main)](https://www.codefactor.io/repository/github/c3budiman/nextjsboiler/overview/main)
[![Continous Integration NextJS Boiler](https://github.com/c3budiman/NextJsBoiler/actions/workflows/node.js.yml/badge.svg)](https://github.com/c3budiman/NextJsBoiler/actions/workflows/node.js.yml)

Boiler Template for next js project - by c3budiman.

Demo URL : <https://next-js-boiler.vercel.app/>

API Documentation : <https://documenter.getpostman.com/view/3745523/TVsoGVX2>

What It Contains?

- custom server if you want to enabled, just go to pages/custom-server-express.js or pages/custom-server-node.js
- Redux, Redux Thunk, Redux Middleware
- ANTD
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
- Amazon AWS S3 integration and examples
- API Midleware Example

What my next goal for this boiler template?

- websocket
- notification example / chat example
- integrating firebase
- adding example of crud data in frontend.

How to use?

- clone this repo
- rename the folder and cd to it.
- run this in terminal

```bash
git remote remove origin
```

- create new repo as for your project and add origin.
- copy .env.example to .env
- fill the required data to .env
- run npm install

```bash
npm install
```

- start dev

```bash
npm run dev
```

- start build using npm run build
- ship it on custom server or vercel or whatever it supports both serverless and custom server.

Aws S3 instruction :

1. Create a new [IAM role](https://aws.amazon.com/iam/) with permission for `AWSCloudFormationFullAccess` and `AmazonS3FullAccess`.
1. Save the access key and secret key.
1. Install the [AWS CLI](https://aws.amazon.com/cli/) and run `aws configure`.
1. This will prompt you to enter the access key and secret key.
1. Run `npm run cdk deploy` to create an S3 bucket with the correct CORS settings.
1. Visit your newly created S3 bucket and retrieve the name and region.
1. Add the name and region to `.env`.
1. done, you can customize the example in /api/s3. or the frontend in /s3/example
