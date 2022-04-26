import { hash } from "../deps.ts";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password);
}