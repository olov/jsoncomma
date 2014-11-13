# jsoncomma.js
Similar to JSON but with trailing commas. Because you like diffs to be
minimal and are fed up with JSON.parse SyntaxError exceptions.

I wrote it in anger.



## Usage
```javascript
> var jsoncomma = require("jsoncomma");
> var str = jsoncomma.stringify({kramer:"yoyoma", hello:[4,2]}, null, 4);
> console.log(str);
{
    "kramer": "yoyoma",
    "hello": [
        4,
        2,
    ],
}

> jsoncomma.parseUnsafe(str);
{ kramer: 'yoyoma', hello: [ 4, 2 ] }
```

`parseUnsafe` is called that for a reason so only feed it trusted data.
`parseUnsafe` is just a wrapper around `new Function`.

`jsoncomma.parseUnsafe(str)` does not support a reviver (the second
`JSON.parse` argument).

`jsoncomma.stringify(v, ignored_replacer, space)` requires a null `replacer`
 and a numeric `space`. It always pretty-prints.



## Contribute
`parseSafe` maybe? That would be sweet. It should work on large and complex
input. If it's also fast then that's a plus.



## Installation

### Node
Install using npm

    npm install jsoncomma

### Browser
Clone the repo and include it in a script tag (or just use Browserify)

    git clone https://github.com/olov/jsoncomma.git

```html
<script src="jsoncomma/jsoncomma.js"></script>
```



## License
MIT, see [LICENSE](LICENSE) file.
