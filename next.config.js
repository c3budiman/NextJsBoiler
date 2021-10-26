const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports
  env: {
    mapBoxApi: "",
    backend: "/",
    APPNAME: "boiler next js",
    APPKEY: "sukasukawajaappkeynyaaapaanygpentingsusahdihackdotnet",
  }
};

// If you want to use Sentry, you can use this config
// dont forget to add the Sentry DSN to your .env file
// const SentryWebpackPluginOptions = {
//   silent: true, // Suppresses all logs
//   tracesSampleRate: 0.6, // Set to 1.0 to sample all traces
// };

// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
module.exports = moduleExports;
