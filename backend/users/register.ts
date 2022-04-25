import { Database } from "../Database";
import { fail, ok, Result } from "../Result";
import { hashPassword } from "../utils/crypto";
import { User } from "./User";


export type RegisterUserRequest = {
    email: string,
    username: string,
    password1st: string,
    password2nd: string,
};

export const registerUser = async (req: RegisterUserRequest, db: Database): Promise<Result<User>> => {

    for (const res = await checkFieldsAreValid(req, db); !res.ok;)
        return res.transform();
    const userInsert = await constructUser(req, db);
    for (const insertRes = await db.insertUser(userInsert); !insertRes.ok;)
        return insertRes.transform();
    return ok(userInsert);
    
}

const checkFieldsAreValid = async (req: RegisterUserRequest, db: Database): Promise<Result<null>> => {
    
    for (const res = checkFieldsAreSpecified(req); !res.ok;)
        return res.transform();
    for (const res = checkPasswordsMatch(req.password1st, req.password2nd); !res.ok;)
        return res.transform();
    for (const res = checkEmailIsValid(req.email); !res.ok;)
        return res.transform();
    for (const res = await checkUserIsUnique(req, db); !res.ok;)
        return res.transform();
    return ok(null);

}

const constructUser = async (req: RegisterUserRequest, db: Database): Promise<User> => {
    return {
        id: (await db.uniqueUserId()).unwrap(),
        email: req.email,
        username: req.username,
        passwordHash: await hashPassword(req.password1st),
    }
}

const checkPasswordsMatch = (p1: string, p2: string): Result<null> => {
    return p1 !== p2 ? fail('passwords must match') : Result.ok(null) 
}

const checkEmailIsValid = (email: string): Result<null> => {
    return !/[\w-_.]+@[\w-_.]+\.[\w]+/.test(email) ? fail('email must be valid') : ok(null);
}

const checkUserIsUnique = async (req: RegisterUserRequest, db: Database): Promise<Result<null>> => {
    if (!(await db.isUserUsernameUnique(req.username)).unwrap())
        return fail('username must be unique')
    if (!(await db.isUserEmailUnique(req.email)).unwrap())
        return fail('email must be unique');
    return ok(null);

}

const checkFieldsAreSpecified = (req: RegisterUserRequest): Result<null> => {
    if (req.email === '')
        return fail('email must be seperated');
    else if (req.username === '')
        return fail('username must be specified');
    else if (req.password1st === '' || req.password2nd === '')
        return fail('password must be specified');
    return Result.ok(null);    
    
    
}