import { rateLimit } from "express-rate-limit";
export const limiter=rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "que isso meu fi calma"
})