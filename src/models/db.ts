import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/banco_test')
.then(()=>{console.log('connectado ao mongodb')})
.catch((e)=>{console.log(e)})

export default mongoose