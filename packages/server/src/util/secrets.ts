import dotenv from "dotenv";
dotenv.config();

console.log(process.env.NODE_ENV);

export const SERVER_PORT = process.env.SERVER_PORT as string;
export const SERVER_ADDRESS = process.env.SERVER_ADDRESS as string;
export const SERVER_HOST = `${SERVER_ADDRESS}:${SERVER_PORT}`;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME as string;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const COMPANY_NAME = process.env.COMPANY_NAME as string;
export const COMPANY_EMAIL = process.env.COMPANY_EMAIL as string;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const FRONTEND_HOST = process.env.FRONTEND_HOST as string;
