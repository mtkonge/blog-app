# Api

## User

### POST /register

#### Request

```ts
{
    username: string,
    password: string
}
```

#### Response

```ts
{
    response: "OK" | "Username already in use" | "Invalid username/password",
    userId?: number
}
```

### Post /login

#### Request

```ts
{
    username: string,
    password: string
}
```

#### Response 
```ts
{
    response: "Ok" | "Wrong password/username",
    id?: number,
    token?: string
}
```

### Post logout

#### Response
```ts
{
    response: "Ok"
}
```

### GET /user/:id


```ts
{
    msg: "Unauthorized" | "User is null",
    id?: number,
    username?: string
}
```

### GET /data

```ts
{
    msg: "Unauthorized" | "Ok" | "User is null"
}
```

## Blog

### POST /create-blog

#### Request

```ts
{
    token: string,
    title: string,
    content: string,
    userId: number
}
```

#### Post

```ts
{
    response: "Ok" | "Unauthorized" | "Title invalid" | "Content too long",
    blog?: Blog[]
}
```
