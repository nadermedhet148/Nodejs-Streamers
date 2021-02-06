import { createWriteStream } from "fs";


const writeStream = createWriteStream("logs");


writeStream.on("close", (e) => console.log("closed" , e));
writeStream.on("drain", (e) => console.log("closed ", e));
writeStream.on("finish", (e) => console.log("finish", e));
writeStream.on("open", (e) => console.log("open", e));
writeStream.on("pipe", (e) => console.log("pipe", e));



let interval ;
let count = 0;

interval = setInterval(() => {
  count++;
  writeStream.write(`${Date.now()} \n`);
  if(count === 10) {
      writeStream.close()
      clearInterval(interval)
  }
}, 1 * 1000);