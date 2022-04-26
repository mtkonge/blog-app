import { Application, Status } from "./deps.ts";
import { Ctx, Next, State } from "./models.ts";

import { loginHandler } from "./Login.ts";
import { MemoryDB } from "./MemoryDB.ts";
import { runWebServer } from "./web/server.ts";


const db = new MemoryDB();
await runWebServer(db);
const app = new Application<State>();

async function setResponseType(ctx: Ctx, next: Next) {
    // Should set response type to json
    // So we dont have to set it later
    ctx.response.type = 'json';
    next();
}

async function createDb(ctx: Ctx, next: Next) {
    // Should initialize ctx.state.db
}

async function loginRoute(ctx: Ctx, next: Next) {
    if (ctx.request.method === 'POST' && ctx.request.url.pathname === '/login') {
        const body = ctx.request.body({type: 'json'});
        const {username, password} = await body.value;
        const res = await loginHandler(ctx.state.db, {username, password});
        ctx.response.body = res;
        ctx.response.status = Status.OK;
    } else {
        next();
    }
}


app.use(setResponseType);
app.use(createDb);
app.use(loginRoute);

app.use((ctx) => {
    ctx.response.body = `{"msg":"Hello World!"}`;
});

app.addEventListener('listen', () => {
  console.log(`Listening on localhost:8000`);
});

await app.listen({ port: 8000 });
