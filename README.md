# write-glyphs-file [![Build Status](https://travis-ci.org/delucis/write-glyphs-file.svg?branch=master)](https://travis-ci.org/delucis/write-glyphs-file)

> Stringify and write a .glyphs font file [atomically](https://github.com/npm/write-file-atomic)

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


## See also

- [load-nextstep-plist](https://github.com/delucis/load-nextstep-plist) - Read and parse NeXTSTEP property list files, including the `.glyphs` font format

## Acknowledgements

Stringification is modelled on Chee’s [`nextstep-plist`](https://www.npmjs.com/package/nextstep-plist).

This module is modelled on Sindre Sorhus’s [`write-json-file`](https://github.com/sindresorhus/write-json-file).

## License

This software is free to use, modify, and redistribute under a [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt).
