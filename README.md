# jsoncomma.js
Similar to JSON but with trailing commas. Because you don't like noisy diffs.



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

> jsoncomma.parseUnsafe(str));
{ kramer: 'yoyoma', hello: [ 4, 2 ] }
```

`parseUnsafe` is called that for a reason so only feed it 100% trusted data
if your care about security. `parseUnsafe` is just a wrapper around
`new Function`.



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
