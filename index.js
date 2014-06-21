var chalk = require("chalk");
var _ = require("lodash");
var matchRecursive = require('match-recursive');

var compile = function (template, params, prefix) {
    function modify(str) {
        return _.reduce(matchRecursive(str, '{...}'), function (str, match) {
            var original = '{' + match + '}';
            // note the recursion. This ensures nested matches containing potential matches are handled.
            var split = /(.+?[^:]):(.+)/.exec(modify(match));
            var color = split[1];
            var content = split[2];
            return str.replace(original, chalk[color](content));
        }, str);
    }

    if (params) {
        template = _.template(template)(params);
    }

    if (prefix) {
        template = [prefix, template].join(" ");
    }

    return modify(template);
};

module.exports.compile = compile;

/**
 * Alternative way to retrieve the compiler, this time with a prefix
 * @param {String} prefix
 * @returns {Function}
 */
module.exports.getCompiler = function (prefix) {
    return function (template, params) {

        var output = [];

        if (Array.isArray(template)) {

            template.forEach(function (item) {
                output.push(compile(item, params, prefix));
            });

            return output.join("\n");
        }

        return compile(template, params, prefix);
    };
};

module.exports.clc = chalk;
module.exports.chalk = chalk;
