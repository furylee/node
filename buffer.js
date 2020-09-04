const protocol = require("protocol-buffers")
const fs = require("fs")

// 创建一个长度为 10 的 Buffer，
// 其中填充了全部值为 `1` 的字节。
console.time("alloc")
const buf1 = Buffer.alloc(10);
console.timeEnd("alloc")

// 创建一个长度为 10、且用 0x78 填充的 Buffer。
const buf2 = Buffer.alloc(10, "x");

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill()、write() 或其他能填充 Buffer 的内容的函数进行重写。
console.time("allocUnsafe")
const buf3 = Buffer.allocUnsafe(10);
console.timeEnd("allocUnsafe")

// 创建一个包含字节 [1, 2, 3] 的 Buffer。
const buf4 = Buffer.from("卧槽大洼大洼大洼的");

// 创建一个包含字节 [1, 1, 1, 1] 的 Buffer，
// 其中所有条目均使用 `(value & 255)` 进行截断以符合 0-255 的范围。
const buf5 = Buffer.from([257, 251.5, -255, '22']);

// 创建一个 Buffer，其中包含字符串 'tést' 的 UTF-8 编码字节：
// [0x74, 0xc3, 0xa9, 0x73, 0x74]（以十六进制表示）
// [116, 195, 169, 115, 116]（以十进制表示）
const buf6 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf7 = Buffer.from('tést', 'latin1');

console.log(buf1);
console.log(buf2);
console.log(buf3);
console.log("from", buf4);
console.log(buf5);
console.log(buf6);
console.log(buf7);

const schema = protocol(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))

console.log(schema);


const buf = schema.Column.encode({
    id: 1,
    name: "le",
    price: 0.1
})

console.log(buf);

console.log(schema.Column.decode(buf));
