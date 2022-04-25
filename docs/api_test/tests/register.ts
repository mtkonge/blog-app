import { CookieJar } from "../deps.ts";
import { API_URL } from "../api_url.ts";
import { randomUsername, test } from "../utils.ts";

interface ReturnedRegisterInformation {
    userId: string;
}

const testMissingPassword = async () => {
    const username = randomUsername();
    const body = {
        username,
        password: "",
    } as unknown as BodyInit;

    const res = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body,
        })
    ).json();

    test(res.ok === false, "register w missing password: response was OK");
    test(
        res.error === "Invalid username/password",
        `register w missing password: response error was '${res.error}', expected 'Invalid username/password'`,
    );
    test(res.user === null, "register w missing password: user field not null");
};

const testMissingUsername = async () => {
    const body = {
        username: "",
        password: "passwd",
    } as unknown as BodyInit;

    const res = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body,
        })
    ).json();

    test(res.ok === false, "register w missing username: response was OK");
    test(
        res.error === "Invalid username/password",
        `register w missing username: response error was '${res.error}', expected 'Invalid username/password'`,
    );
    test(res.user === null, "register w missing username: user field not null");
};

const testCorrectRegister = async (
    username: string,
): Promise<ReturnedRegisterInformation> => {
    const body = {
        username,
        password: "passwd",
    } as unknown as BodyInit;

    const res = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body,
        })
    ).json();

    test(res.ok === true, "register correctly: response was not OK");
    test(
        res.error === null,
        `register correctly: response error was '${res.error}', expected null`,
    );
    test(res.user !== null, "register correctly: user field null");
    test(res.user?.id !== null, "register correctly: user id null");
    test(
        res.user?.username === username,
        `register correctly: invalid user.username, expected '${username}', got '${res.user.username}'`,
    );
    test(
        res.user?.passwordHash !== null,
        "register correctly: user password hash null",
    );

    return { userId: res.user?.password };
};

const testDuplicateUsername = async () => {
    const username = randomUsername();
    const body = {
        username,
        password: "passwd",
    } as unknown as BodyInit;

    const res0 = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body: body,
        })
    ).json();

    const res1 = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body: body,
        })
    ).json();

    test(
        res0.ok === true,
        "register w duplicate username: first registered user was not OK",
    );

    test(
        res1.ok === false,
        "register w duplicate username: second registered user was OK",
    );
};

const testUniqueUserId = async () => {
    const username0 = randomUsername();
    const body0 = {
        username: username0,
        password: "passwd",
    } as unknown as BodyInit;

    const res0 = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body: body0,
        })
    ).json();

    const username1 = randomUsername();
    const body1 = {
        username: username1,
        password: "passwd",
    } as unknown as BodyInit;

    const res1 = await (
        await fetch(API_URL + "/users/register", {
            method: "POST",
            body: body1,
        })
    ).json();

    test(
        res0.ok === true,
        "register unique ids: first registered user was not OK",
    );

    test(
        res1.ok === true,
        "register unique ids: second registered user was not OK",
    );

    test(
        res0.user?.id !== res1.user?.id,
        "register unique ids: first and second user had the same ids",
    );
};

export const testRegister = async (
    username: string,
    jar: CookieJar,
): Promise<ReturnedRegisterInformation> => {
    await testMissingPassword();
    await testMissingUsername();
    await testDuplicateUsername();
    await testUniqueUserId();
    return await testCorrectRegister(username);
};
