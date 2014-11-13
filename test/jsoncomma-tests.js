"use strict";

var test = require("tap").test;
var jsoncomma = require("../");

test("exceptions", function(t) {
    t.throws(function() {
        jsoncomma.parseUnsafe('x');
    });
    t.throws(function() {
        jsoncomma.parseUnsafe('{:1}');
    });
    t.throws(function() {
        jsoncomma.parseUnsafe('a:1');
    });
    t.doesNotThrow(function() {
        jsoncomma.parseUnsafe('Math');
    });
    t.end();
});

test("various", function(t) {
    t.deepEqual([1,2], [1,2]);

    function both(v, str) {
        t.equal(jsoncomma.stringify(v, null, 4), str);
        t.deepEqual(jsoncomma.parseUnsafe(str), v);
    }

    function stringify(v, str) {
        t.equal(jsoncomma.stringify(v, null, 4), str);
    }

    function parse(str, v) {
        t.deepEqual(jsoncomma.parseUnsafe(str), v);
    }

    function join(/*var_args*/) {
        return [].join.call(arguments, "\n");
    }

    both(1, '1');
    both("hello", '"hello"');
    both(null, 'null');
    stringify(undefined, undefined);
    both(true, 'true');
    both(false, 'false');
    both([], '[]');
    stringify([1, "two", null, undefined], join(
        '[',
        '    1,',
        '    "two",',
        '    null,',
        '    null,',
        ']'
    ));
    stringify([1, ["two", "three"], null, undefined], join(
        '[',
        '    1,',
        '    [',
        '        "two",',
        '        "three",',
        '    ],',
        '    null,',
        '    null,',
        ']'
    ));
    parse('[1,"two",null,null]', [1, "two", null, null]);
    parse('[1,"two",null,[]]', [1, "two", null, []]);
    both({}, '{}');
    both({hello: 1, world: "two"}, join(
        '{',
        '    "hello": 1,',
        '    "world": "two",',
        '}'
    ));
    both({hello: 1, world: [1, "two", null]}, join(
        '{',
        '    "hello": 1,',
        '    "world": [',
        '        1,',
        '        "two",',
        '        null,',
        '    ],',
        '}'
    ));

    t.end();
});
