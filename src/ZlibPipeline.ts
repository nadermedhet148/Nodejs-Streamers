import { createGzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream } from "fs";

pipeline(
  createReadStream("logs"),
  createGzip(),
  createWriteStream("logs.gz"),
  (err) => {
    if (err) {
      console.error("An error occurred:", err);
      process.exitCode = 1;
    }
  }
);
