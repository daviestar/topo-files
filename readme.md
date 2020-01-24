<img src="logo.png" />

### Installation

```
npm add --save sql-modules
yarn add sql-modules
```

### Example
Given the following file structure:

```
files/
  fileA.txt
  fileB.txt
  fileC.txt
```

_files/fileA.txt_
```sh
# requires fileB
File A
```

_files/fileB.txt_
```sh
# requires fileC
File B
```

_files/fileC.txt_
```sh
File C
```

Point `topoFiles` at the `files` directory.
```js
const path = require('path')
const {topoFiles} = require('topo-files')

const filesDir = path.join(__dirname, 'files')

const combined = topoFiles(filesDir, {
  ext: '.txt',
  comment: '#'
})

console.log(combined)
```
Outputs:
```sh
# File: fileC.txt
File C

# File: fileA.txt
# requires fileC
File B

# File: fileB.txt
# requires fileB
File A
```

### Declaring file dependencies



