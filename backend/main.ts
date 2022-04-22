import { Application, Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";

type LoginRequest = {
    username: string,
    password: string,
}

type LoginResult = {
    msg: string
}

function loginHandler(req: LoginRequest): LoginResult {
    const {username, password} = req;
    if (username != password)
        throw new Error('yes yes');
    else
        return {msg: "hello world"};
}


const app = new Application();

app.use((ctx) => {
    // So we dont have to set it later
    ctx.response.type = 'json';
})

app.use(async (ctx, next) => {
    if (ctx.request.method === 'POST' && ctx.request.url.pathname === '/login') {
        const body = ctx.request.body({type: 'json'});
        const {username, password} = await body.value;
        const res = loginHandler({username, password});
        ctx.response.body = res;
        ctx.response.status = Status.OK;
    } else {
        next();
    }
});

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });