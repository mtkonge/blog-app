import { Db } from "./models.ts"
import { encryptPassword } from "./utils.ts";

type LoginRequest = {
    username: string,
    password: string,
}

type LoginResult = {
    msg: string
}

async function verifyPassword(db: Db, username: string, password: string): Promise<boolean> {
    // should encrypt password and check if aligns with database user password
    throw new Error("unimplemented");
}

export function loginHandler(db: Db, req: LoginRequest): LoginResult {
    // should verify password
    throw new Error("unimplemented");
}

