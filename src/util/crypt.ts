import bcrypt from 'bcrypt';
//gerador de hash
export default async function (senha: string) {
    const sault = 10
    return bcrypt.hash(senha, sault)
}