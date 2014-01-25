var strings = require("../index.js");
var compile = strings.getCompiler("{green:[BS]}");
var ansiTrim = require('cli-color/lib/trim');

describe("Returning the compile function", function () {
    it("can use a prefix", function () {
        expect(typeof compile === "function").toBe(true);
    });
    it("can compile with a prefix", function () {
        var actual = ansiTrim(compile("kittie"));
        var expected = "[BS] kittie";
        expect(actual).toBe(expected);
    });
});