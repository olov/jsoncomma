// jsoncomma.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013,2014 Olov Lassus <olov.lassus@gmail.com>

var jsoncomma = (function() {
    "use strict";

    function seval(expr) {
        return (new Function("", "'use strict'; return (" + expr + ")"))();
    }

    function stringify(v, ignored_replacer, space) {
        if (v === undefined) {
            return;
        }
        if (ignored_replacer) {
            throw new Error("json-comma stringify does not support a replacer function")
        }
        if (typeof space !== "number") {
            throw new Error("json-comma stringify requires a space parameter");
        }

        var indent = "";
        var indent_add = Array(space + 1).join(" ");

        return stringifyAux(v);


        function stringifyIndented(v) {
            return indent + stringifyAux(v);
        }

        function stringifyAux(v) {
            if (typeof v === "string") {
                return JSON.stringify(v);
            }
            if (v === null || v === undefined) { // undefined or null
                return "null";
            }
            if (typeof v === "number" || typeof v === "boolean") {
                return String(v);
            }
            if (Array.isArray(v)) {
                if (v.length === 0) {
                    return "[]";
                }
                var oldIndent = indent;
                indent += indent_add;

                var res = "[\n" + v.map(stringifyIndented).join(",\n") + ",\n" + oldIndent + "]";

                indent = oldIndent;
                return res;
            }

            // object
            var oldIndent = indent;
            indent += indent_add;

            var keys = Object.keys(v);
            if (keys.length === 0) {
                return "{}";
            }

            var res = "{\n" + keys.map(function(key) {
                var val = v[key];
                return stringifyIndented(key) + ": " + stringifyAux(val) + ",\n";
            }).join("") + oldIndent + "}";

            indent = oldIndent;
            return res;
        }
    }

    function parseUnsafe(str, ignored_reviver) {
        if (ignored_reviver) {
            throw new Error("json-comma parse does not support a reviver function")
        }
        str = String(str);

        try {
            return seval(str);
        } catch(e) {
            throw new Error("Invalid characters in JSON");
        }
    }

    return {
        stringify: stringify,
        parseUnsafe: parseUnsafe,
    };
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = jsoncomma;
}
