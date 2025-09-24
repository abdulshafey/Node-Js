// Import Buffer from Node's buffer module
const { Buffer } = require('node:buffer');

// 1. Buffer.alloc(size) → creates a zero-filled buffer
const buf = Buffer.alloc(4)
console.log(buf);
// Output: <Buffer 00 00 00 00>
// 4 bytes allocated and filled with zeros

// 2. Buffer.allocUnsafe(size) → creates buffer faster but memory is not cleared
const buf2 = Buffer.allocUnsafe(10)
console.log(buf2);
// Output: <Buffer ... random data >
// ⚠️ Can contain old memory data → faster but unsafe if not overwritten

// 3. Writing to buffer
const buf3 = Buffer.alloc(8)
buf3.write("Hello")
console.log(buf3.toString());
// Output: Hello
// "Hello" (5 chars) written into allocated 8 bytes buffer

// 4. Buffer.from(string) → directly creates buffer from string
const buf4 = Buffer.from("Hello from Buffer")
console.log(buf4.toString());
// Output: Hello from Buffer

console.log(buf4.toString('utf-8', 0, 5));
// Output: Hello
// Decoded from UTF-8, only bytes 0–5 are read

// 5. Modifying buffer directly by index
const buf5 = Buffer.from("Hey!")
// console.log(buf5);        // <Buffer 48 65 79 21>  (H e y !)
buf5[0] = 0x68;              // 0x68 = ASCII for 'h' (lowercase)
console.log(buf5.toString());
// Output: hey!

// 6. Concatenating buffers
const val1 = Buffer.from("John")
const val2 = Buffer.from(" Wick")
const merged = Buffer.concat([val1, val2])

console.log(merged.toString());
// Output: John Wick

console.log(merged.length);
// Output: 9  (number of bytes in the merged buffer)
