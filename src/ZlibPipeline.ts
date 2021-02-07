import { createGzip } from "zlib";
import { pipeline, Transform } from "stream";
import { createReadStream, createWriteStream } from "fs";

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

pipeline(
  createReadStream("logs"),
  createGzip(),
  reportProgress,
  createWriteStream("logs.gz"),
  (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  }
);
