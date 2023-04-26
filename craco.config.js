const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, "src", p);

module.exports = {
    webpack: {
        alias: {
            "@scss-variables": resolvePath("variables.scss"),
            "@components": resolvePath("components"),
            "@types-components": resolvePath("types/components"),
            "@types-ui": resolvePath("types/ui"),
            "@utils": resolvePath("utils"),
            "@hooks": resolvePath("hooks"),
            "@ui": resolvePath("ui"),
        },
    },
};
