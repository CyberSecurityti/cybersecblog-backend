import mongoose from "./db";
//schema de post
const postSchema = new mongoose.Schema({
     titulo:String,
    noticia:String,
    data: Date,
    fonte: String,
    imagem: String,
   
}, { collection: 'posts' }
);
export default postSchema