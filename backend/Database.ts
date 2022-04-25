import { Result } from "./Result";
import { User, UserId } from "./users/User";


export interface Database {

    uniqueUserId(): Promise<Result<UserId>>
    isUserEmailUnique(email: string): Promise<Result<boolean>>
    isUserUsernameUnique(username: string): Promise<Result<boolean>>
    insertUser(user: User): Promise<Result<null>>
}