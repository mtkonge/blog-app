# Api

### In general

All id's are strings

All responses have an `ok: boolean` field, which can be checked reliably to assert success.

Requests with a * attached signify that it requires a `token` header acquired from user login.

## Users

### POST /register

```
/api/users/register
```

Create a new user.

#### Request

Username must be valid and unique.

```ts
{
    username: string,
    password: string
}
```

#### Response OK

```ts
{
    ok: true,
    user: {
        id: string,
        username: string,
        passwordHash: string,
    }
}
```

#### Response Error

```ts
{
    ok: false,
    error: "Username already in use" | "Invalid username/password" | string,
}
```

### GET /:id

```
/api/users/:userId
```

Get publicly available data of any user.

#### Request Params

```ts
{
    userId: string
}
```

#### Response OK

```ts
{
    ok: true,
    user: {
        id: string,
        username: string,
    },
}
```

#### Response Error

```ts
{
    ok: false,
    error: "Unknown user" | string,
}
```

### GET /data *

```
/api/users/data
```

#### Response OK

```ts
{
    ok: true,
    user: {
        id: string,
        username: string,
        passwordHash: string,
    },
}
```

#### Response Error

```ts
{
    ok: false,
    error: "Unauthorized" | "Unknown user" | string,
}
```

## Sessions

### Post /login

```
/api/sessions/login
```

Create a session of an existing user, to get a token for use in other requests.

#### Request

```ts
{
    username: string,
    password: string
}
```

#### Response OK

```ts
{
    ok: true,
    token: string,
}
```

#### Response Error

```ts
{
    ok: false,
    error: "unknown username/password" | string,
}
```

## Blog

### GET /:blogId

```
/api/blogs/:blogId
```

#### Request Params

```ts
{
    blogId: string,
}
```

#### Response OK

```ts
{
    ok: true,
    blog: {
        id: string
        title: string,
        content: string,
        authorUserId: string,
    }
}
```

#### Response Error

```ts
{
    ok: false,
    error: string,
}
```

### POST /create *

```
/api/blogs/create
```

#### Request

```ts
{
    title: string,
    content: string,
    authorUserId: string,
}
```

#### Response OK

```ts
{
    ok: true,
    blog: {
        id: string,
        title: string,
        content: string,
        authorUserId: string,
    }
}
```

#### Response Error


```ts
{
    ok: false,
    error: "Unauthorized" | "Title invalid" | "Content too long" | string,
}
```
