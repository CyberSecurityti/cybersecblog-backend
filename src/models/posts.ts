import mongoose from "./db";

const userSchema = new mongoose.Schema({
     titulo:String,
    noticia:String,
    data: Date,
    fonte: String,
    imagem: String,
   
}, { collection: 'posts' }
);
export default userSchema