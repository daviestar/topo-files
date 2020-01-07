<img src="logo.png" />

### Installation

```
npm add --save sql-modules
yarn add sql-modules
```

### Usage example
Given the following file structure:

```
index.js
files/
  fileA.txt
  fileB.txt
  fileC.txt
```

_fileA.txt_
```sh
# requires fileC
File A
```

_fileB.txt_
```
-- requires fileC
```

_index.js_
```js
const path = require('path')
const {topoFiles} = require('topo-files')

const dir = path.join(__dirname, 'files')
const combined = topoFiles(dir)
console.log(combined)
```
