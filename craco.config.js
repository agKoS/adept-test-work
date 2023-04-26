const path = require("path");
const cracoAlias = require("craco-alias");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                baseUrl: "./src",
                source: "tsconfig",
            },
        },
    ],
    webpack: {
        alias: {
            "@scss-variables": resolvePath("./src/variables.scss"),
        },
    },
};
