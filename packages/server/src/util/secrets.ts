import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NODE_ENV);

export const SERVER_PORT = process.env.SERVER_PORT as string;
export const SERVER_ADDRESS = process.env.SERVER_ADDRESS as string;
export const SERVER_HOST = `${SERVER_ADDRESS}:${SERVER_PORT}`;
