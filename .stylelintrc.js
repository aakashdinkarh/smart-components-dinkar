const noCssVarsOutsideApp = require('./customStylelint/no-css-vars-outside-app');

module.exports = { 
    plugins: [noCssVarsOutsideApp],
    "extends": ["stylelint-config-standard"],
    "rules": {
        "selector-class-pattern": null,
        "custom/no-css-vars-outside-app": true,
        "selector-pseudo-class-no-unknown": [
            true,
            {
              "ignorePseudoClasses": ["global"]
            }
        ]
    }
}