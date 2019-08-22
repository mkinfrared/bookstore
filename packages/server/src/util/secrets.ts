import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NODE_ENV);

export const SERVER_PORT = process.env.SERVER_PORT || 4000;
