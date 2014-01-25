var clc = require("cli-color");
var _ = require("lodash");

_.templateSettings.interpolate = /{:([\s\S]+?):}/g

var compile = function (template, params, prefix) {

    /**
     * @param string
     * @returns {String}
     */
    var modifier = function (string) {

        var split = /{(.+?[^:]):(.+?)(?:})/.exec(string);

        var color = split[1];
        var content = split[2];

        return clc[color](content);
    };

    /**
     * @param string
     * @returns {String}
     */
    var replacer = function (string) {
        return modifier(string);
    };


    if (params) {
        template = _.template(template)(params);
    }

    if (prefix) {
        template = [prefix, template].join(" ");
    }

    return template.replace(/({.+?[^:]:)(.+?)(?:})/g, replacer);
};

module.exports.compile = compile;

/**
 * Alternative way to retrieve the compiler, this time with a prefix
 * @param {String} prefix
 * @returns {Function}
 */
module.exports.getCompiler = function (prefix) {
    return function (template, params) {
        return compile(template, params, prefix);
    };
};
module.exports.clc = clc;