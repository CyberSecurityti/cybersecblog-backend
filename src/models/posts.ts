import mongoose from "./db";

const postSchema = new mongoose.Schema({
     titulo:String,
    noticia:String,
    data: Date,
    fonte: String,
    imagem: String,
   
}, { collection: 'posts' }
);
export default postSchema