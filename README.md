# write-glyphs-file [![Build Status](https://travis-ci.org/delucis/write-glyphs-file.svg?branch=master)](https://travis-ci.org/delucis/write-glyphs-file)

> Stringify and write a `.glyphs` font file [atomically](https://github.com/npm/write-file-atomic)

Converts a Javascript object into a string for use with the `.glyphs` font format and writes it to disk. Creates directories for you as needed.


## Install

```
$ npm install --save write-glyphs-file
```


## Usage

```js
const WRITE_GLYPHS = require('write-glyphs-file')

WRITE_GLYPHS('my-font.glyphs', { familyName: 'My Font' /* ... */ })
	.then(() => {
		console.log('done writing')
	})
```


## API

### writeGlyphsFile(filepath, data, [options])

Returns a `Promise` that resolves once the file has finished writing.

### writeGlyphsFile.sync(filepath, data, [options])

Write the file synchronously, blocking further execution until it’s done.

```js
const WRITE_GLYPHS = require('write-glyphs-file')

WRITE_GLYPHS.sync('my-font.glyphs', { familyName: 'My Font' /* ... */ })
console.log('done writing')
```

#### options

Type: `Object`

##### mode

Type: `number`<br>
Default: `0o666`

[Mode](https://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation) used when writing the file.

## Implementation Details

The [Glyphs font editing software](http://glyphsapp.com/) saves fonts to files using the `.glyphs` extension. The format closely follows the NeXTSTEP “plain text” property list format, an old format that vaguely resembles JSON. For example:

```plist
{ "array" = ( "string", "string" ); }
```

However, the formatting of a `.glyphs` file is a little more specific than the generic NeXTSTEP specfication. For example, a `.glyphs` file will contain a `familyName` key with the name of your font family as its value:

```plist
{ familyName = "My Font"; }
```

Which is equivalent to this Javascript object:

```js
{ familyName: "My Font" }
```

A standard way of safely stringifying this object to a valid NeXTSTEP property list would be to wrap all keys in quotes:

```plist
{ "familyName" = "My Font"; }
```

However, Glyphs will not find your `familyName` if its key is quoted like that. To try to output files as close as possible to the original `.glyphs` files, this package will not quote strings as long as they only contain “word” characters (`A-Za-z0-9_`).

Similarly, a one-line file can be a valid NeXTSTEP property list as the parsing relies on commas, semicolons, parentheses, and braces. However, Glyphs’ parser seems to break down if a `.glyphs` file doesn’t also use new lines to break up the text.

`write-glyphs-file` will write the following as opposed to compressing it on one line:

```plist
{
familyName = "My Font";
}
```

## See also

- [load-nextstep-plist](https://github.com/delucis/load-nextstep-plist) - Read and parse NeXTSTEP property list files, including the `.glyphs` font format

## Acknowledgements

Stringification is modelled on Chee’s [`nextstep-plist`](https://www.npmjs.com/package/nextstep-plist).

The file writing logic is modelled on Sindre Sorhus’s [`write-json-file`](https://github.com/sindresorhus/write-json-file).

## License

This software is free to use, modify, and redistribute under a [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt).
