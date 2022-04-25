import { Database } from "./Database";
import { ok, Result } from "./Result";
import { User, UserId } from "./users/User";


export class MemoryDB implements Database {
    
   
   
    private nextUserId = 0;
    private users: User[] = [];
   
    public async isUserUsernameUnique(username: string): Promise<Result<boolean>> {
        return ok(this.users.find(u => u.username === username) === undefined);
    }

    public async isUserEmailUnique(email: string): Promise<Result<boolean>> {
        return ok(this.users.find(u => u.email === email) === undefined);
    }
    public async uniqueUserId(): Promise<Result<UserId>> {
        return ok(this.nextUserId++);
    }

    public async insertUser(user: User): Promise<Result<null>> {
        this.users.push(user);
        return ok(null);
    }
}