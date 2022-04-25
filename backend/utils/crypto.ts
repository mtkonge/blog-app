import { hash } from "../deps";

export const hashPassword = async (password: string): Promise<string> => {
    return await hash(password);
}