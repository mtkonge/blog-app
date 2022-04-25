import { Application, Status, Context } from "./deps.ts";

interface User {
    name: string,
    password: string,
}

export interface Db {
    userFromName(name: string): User;
}

export interface State {
    db: Db;
}

export type Ctx = Context<State, State>;

export type Next = () => Promise<unknown>;
