
import * as fs from 'fs';
import axios from 'axios';
import { Duplex, Stream } from 'stream';


export const bufferToStream = (buffer: Buffer): Stream => {
  if (buffer) {
    const duplexStream = new Duplex();
    duplexStream.push(buffer);
    duplexStream.push(null);
    return duplexStream;
  }
  throw new Error('Incomplete arameters !');
};


export const fileToBuffer = async (url: string): Promise<Buffer> => {
  if (url) {
    const response = await axios({ url, responseType: 'arraybuffer' });
    return response.data;
  }
  throw new Error('Incomplete arameters !');
};

export const fileToDuplexStream = async (url: string): Promise<Stream> => {
  if (url) {
    const buffer = await fileToBuffer(url);
    const duplexStream = bufferToStream(buffer);
    return duplexStream;
  }
  throw new Error('Incomplete arameters !');
};

export const fileToStr = async (url: string, type: BufferEncoding = 'base64'): Promise<string> => {
  if (url && type) {
    const buffer = await fileToBuffer(url);
    return buffer.toString(type);
  }
  throw new Error('Incomplete arameters !');
};

export const fileDownload = async (url: string, path: string): Promise<string> => {
  if (url && path) {
    if (fs.existsSync(path)) {
      const absolutePath = `${path}/${url.split('/').pop()}`;
      const response = await axios({ url, responseType: 'stream' });
      // Streaming writes to a local address
      await response.data.pipe(fs.createWriteStream(absolutePath));
      return absolutePath;
    }
    throw new Error('Path doesn\'t exist !');
  }
  throw new Error('Incomplete arameters !');
};