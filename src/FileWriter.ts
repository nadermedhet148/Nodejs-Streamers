import { createWriteStream } from "fs";
import { Transform } from "stream";

const writeStream = createWriteStream("logs");

const logger = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write(chunk.toString());
    callback(null, chunk);
  },
});

const toAsci = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().split('').map(chunk=>chunk.charCodeAt(0)).join('') + '\n');
  },
});

writeStream.on("close", (e) => console.log("closed", e));
writeStream.on("drain", (e) => console.log("closed ", e));
writeStream.on("finish", (e) => console.log("finish", e));
writeStream.on("open", (e) => console.log("open", e));
writeStream.on("pipe", () => console.log("pipe"));

logger.pipe(toAsci).pipe(writeStream);

let interval;
let count = 0;

interval = setInterval(() => {
  count++;
  logger.write(`${Date.now()} \n`);
  if (count === 10) {
    clearInterval(interval);
  }
}, 1 * 1000);
