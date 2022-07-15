import mongoose from "./db";

const userSchema = new mongoose.Schema({
   nome: String,
   email: String,
   senha: String,
  classe: String
}, { collection: 'users' }
);
export default userSchema