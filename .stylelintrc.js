const noCssVarsOutsideApp = require('./customStylelint/no-css-vars-outside-app');

module.exports = { 
    plugins: [noCssVarsOutsideApp],
    "extends": ["stylelint-config-standard"],
    "rules": {
        [noCssVarsOutsideApp.ruleName]: true,
        "selector-pseudo-class-no-unknown": [
            true,
            {
              "ignorePseudoClasses": ["global"]
            }
        ]
    }
}
