## writeFile
1. Purpose
- writeFile is an asynchronous method used to write data to a file.
- If the file already exists, its content will be replaced.
- If the file does not exist, it will be created.

#  "Can be a string, Buffer, or Uint8Array"
1. String
### A string is plain text, like "Hello, World!" or "File content here.". In Node.js, strings are commonly used to represent textual data.
```js
const data = "Hello, this is a string!";
fs.writeFileSync('example.txt', data); // Writes the string to a file
```
2. Buffer
### A Buffer is a special object in Node.js designed to handle binary data (like images, files, or raw bytes). It allows you to manipulate and work with data that isn't necessarily textual.
#### Characteristics:
1. Used for raw binary data.
2. Each byte in the buffer represents a small chunk of the data.
```js
const data = Buffer.from("Hello, this is a Buffer!");
fs.writeFileSync('example.txt', data); // Writes the binary data to a file
// Buffers are particularly useful when dealing with streams, images, or binary files.
```
3. Uint8Array
### A Uint8Array is a type of TypedArray in JavaScript that represents an array of unsigned 8-bit integers. It’s used to work with binary data and is more generic compared to Buffer.

#### Characteristics:
1. Part of the broader JavaScript TypedArray family.
2. Can store numbers ranging from 0 to 255.
```js
const data = new Uint8Array([72, 101, 108, 108, 111]); // Represents "Hello"
fs.writeFileSync('example.txt', data); // Writes the binary data to a file

```
