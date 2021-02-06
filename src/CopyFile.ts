import {createReadStream , createWriteStream} from 'fs';

const readStream = createReadStream("logs" , {

});
const writeStream = createWriteStream("logs2");

// will send the 
readStream.pipe(writeStream)

readStream.on("close", (e) => console.log("closed" , e));
readStream.on("drain", (e) => console.log("closed ", e));
readStream.on("finish", (e) => console.log("finish", e));
readStream.on("open", (e) => console.log("open", e));
readStream.on("pipe", (e) => console.log("pipe"));
readStream.on("data" , (data)=>{
    console.log('data : ' ,data);
})


