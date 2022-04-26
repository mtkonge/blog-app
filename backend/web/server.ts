import { Database } from "../Database.ts";
import { Application, Router } from "../deps.ts";
import { setUsersRoutes } from "./users.ts";


export const runWebServer = async (db: Database) => {
    const app = new Application();
    const router = new Router();
    setUsersRoutes(router, db);

}