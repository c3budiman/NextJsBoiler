// module.exports = {
// images: {
//     domains: ['avatars1.githubusercontent.com', 'hellocdkstack-nextjsboilerb3735f9c-1hcfw1w0txr1g.s3.ap-southeast-1.amazonaws.com'],
// },
// serverRuntimeConfig: {
//     PROJECT_ROOT: __dirname,
// },
// publicRuntimeConfig: {
//     EnableLogging: true,
// }
// }

if (typeof require !== "undefined") {
    // eslint-disable-next-line no-unused-vars
    require.extensions[".less"] = file => { };
}

const withLess = require("@zeit/next-less"),
    nextConfig = {
        target: "serverless",
        images: {
            domains: ['avatars1.githubusercontent.com', 'hellocdkstack-nextjsboilerb3735f9c-1hcfw1w0txr1g.s3.ap-southeast-1.amazonaws.com'],
        },
        serverRuntimeConfig: {
            PROJECT_ROOT: __dirname,
        },
        publicRuntimeConfig: {
            EnableLogging: true,
        },
        onDemandEntries: {
            maxInactiveAge: 1000 * 60 * 60,
            pagesBufferLength: 5
        },
        lessLoaderOptions: {
            javascriptEnabled: true
        },
        webpack: (config, { isServer }) => {
            if (!isServer) {
                config.node = {
                    fs: 'empty'
                }
            }

            config.module.rules.push(
                {
                    test: /\.md$/,
                    use: "raw-loader",
                }
            );

            if (isServer) {
                const antStyles = /(antd\/.*?\/style).*(?<![.]js)$/;
                const origExternals = [...config.externals];
                config.externals = [
                    (context, request, callback) => {
                        if (request.match(antStyles)) return callback();
                        if (typeof origExternals[0] === "function") {
                            origExternals[0](context, request, callback);
                        } else {
                            callback();
                        }
                    },
                    ...(typeof origExternals[0] === "function" ? [] : origExternals)
                ];

                config.module.rules.unshift({
                    test: antStyles,
                    use: "null-loader"
                });
            }
            return config;
        }
    };

module.exports = withLess(nextConfig);
