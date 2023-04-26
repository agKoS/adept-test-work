const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
    webpack: {
        alias: {
            "@scss-variables": resolvePath("./src/variables.scss"),
        },
    },
};
