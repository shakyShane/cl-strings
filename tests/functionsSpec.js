var strings = require("../index.js");
var compile = strings.getCompiler("{green:[BS]}");
var chalk   = require('chalk');
var stripColor = chalk.stripColor;

describe("Returning the compile function", function () {
    it("can use a prefix", function () {
        expect(typeof compile === "function").toBe(true);
    });
    it("can compile with a prefix", function () {
        var actual = stripColor(compile("kittie"));
        var expected = "[BS] kittie";
        expect(actual).toBe(expected);
    });
    it("can compile multiple lines with prefix (1)", function () {
        var actual = stripColor(compile(["kittie", "shane"]));
        var expected = "[BS] kittie\n[BS] shane";
        expect(actual).toBe(expected);
    });
    it("can compile multiple lines with prefix (2)", function () {
        var actual = stripColor(compile(["{green:kittie}", "shane"]));
        var expected = "[BS] kittie\n[BS] shane";
        expect(actual).toBe(expected);
    });
});
