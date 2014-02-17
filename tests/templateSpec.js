var compile = require("../index.js").compile;
var chalk   = require('chalk');
var stripColor = chalk.stripColor;

describe("Compiling strings", function () {

    it("Can replace a single occurrence", function () {
        var string = "{green:Hi there}";
        var expected =  "Hi there";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("Can replace a single occurrence", function () {
        var string = "{green:Hi :there}";
        var expected =  "Hi :there";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("Can replace a multiple occurrences", function () {
        var string = "{green:Hi there} {red:Shane}";
        var expected =  "Hi there Shane";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("Can replace a multiple occurrences with content between", function () {
        var string = "{green:Hi there} and then {red:Goodbye}";
        var expected =  "Hi there and then Goodbye";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("can replace with regular content at the end", function () {
        var string = "{green:bet you can't compile} this";
        var expected =  "bet you can't compile this";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("can replace with regular content at the begining", function () {
        var string = "bet you can't compile {green:this}";
        var expected =  "bet you can't compile this";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("can replace with line breaks", function () {
        var string = "bet you can't \ncompile {green:this}";
        var expected =  "bet you can't \ncompile this";
        expect(stripColor(compile(string))).toBe(expected);
    });
    it("can replace with random curlies", function () {
        var string = "bet you {can't}} \ncompile {green:this}";
        var expected =  "bet you {can't}} \ncompile this";
        expect(stripColor(compile(string))).toBe(expected);
    });
});

describe("Accepting variables to be interpolated", function () {
    it("can run through lodash templates (1)", function () {
        var expected = "Hi there Shane";
        var template = "{red:Hi there} {:name:}";
        var params = {name: "Shane"};
        expect(stripColor(compile(template, params))).toBe(expected);
    });
    it("can run through lodash templates (2)", function () {
        var expected = "Hi there Shane";
        var template = "{red:Hi there {:name:}}";
        var params = {name: "Shane"};
        expect(stripColor(compile(template, params))).toBe(expected);
    });
    it("can run through lodash templates (3)", function () {
        var expected = "Hi there Shane\n";
        var template = "{red:Hi there {:name:}}\n";
        var params = {name: "Shane"};
        expect(stripColor(compile(template, params))).toBe(expected);
    });
    it("can run through lodash templates (4)", function () {
        var expected = "Hi there\nShane\n";
        var template = "Hi there\n{red:Shane}\n";
        var params = {name: "Shane"};
        expect(stripColor(compile(template, params))).toBe(expected);
    });
});
