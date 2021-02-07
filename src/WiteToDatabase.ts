import { createReadStream } from "fs";
import { verbose } from "sqlite3";
import { Writable } from "stream";
const sqlite3 = verbose();
var db = new sqlite3.Database(":memory:");

const readStream = createReadStream("logs");

class WriteToDbStream extends Writable {
  constructor() {
    super();
  }
  _write(chunk: Buffer, encoding, callback) {
    for (const item of chunk.toString().split("\n")) {
      db.run(`INSERT INTO logs (info) VALUES ('${item}')`);
    }
  }
  _destroy(err, callback) {
    db.close();
  }
}

db.run(`CREATE TABLE logs (info TEXT)`, (data, e) => {
  const dbStreamer = new WriteToDbStream();
  readStream.pipe(dbStreamer);
});
