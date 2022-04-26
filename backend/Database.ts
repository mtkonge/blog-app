import { Result } from "./Result.ts";
import { User, UserId } from "./users/User.ts";


export interface Database {

    uniqueUserId(): Promise<Result<UserId>>
    isUserEmailUnique(email: string): Promise<Result<boolean>>
    isUserUsernameUnique(username: string): Promise<Result<boolean>>
    insertUser(user: User): Promise<Result<null>>
}