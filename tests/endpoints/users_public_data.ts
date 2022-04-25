import { ReturnedRegisterInformation } from "./register.ts";
import { API_URL } from "../api_url.ts";
import { test, hasValue, randomUsername } from "../utils.ts";

const testUnknownUser = async () => {
    const randomUserId = "unknown_" + randomUsername();
    const res = await (
        await fetch(API_URL + `/users/${randomUserId}`, {
            method: "GET",
        })
    ).json();

    test(res.ok === false, "public data from unknown user: response was OK");
    test(
        hasValue(res.user) === false,
        "public data from unknown user: user was not null",
    );
    test(
        res.error === "Unknown user",
        `public data from unknown user: response error was '${res.error}', expected 'Unknown user'`,
    );
};

const testUserData = async (info: ReturnedRegisterInformation) => {
    const res = await (
        await fetch(API_URL + `/users/${info.userId}`, {
            method: "GET",
        })
    ).json();

    test(res.ok === true, "public data from known user: response was not OK");
    test(
        hasValue(res.user) === true,
        "public data from known user: user was null",
    );
    test(
        res.user.username === info.username,
        `public data from known user: invalid user.username, expected '${info.username}', got '${res.user.username}'`,
    );
    test(
        res.user.id === info.userId,
        `public data from known user: invalid user.id, expected '${info.userId}', got '${res.user.id}'`,
    );
};

const testOnlyPublicData = async (info: ReturnedRegisterInformation) => {
    const res = await (
        await fetch(API_URL + `/users/${info.userId}`, {
            method: "GET",
        })
    ).json();

    test(
        res.ok === true,
        "only public data from known user: response was not OK",
    );
    test(
        hasValue(res.user) === true,
        "only public data from known user: user was null",
    );
    test(
        hasValue(res.user.password) === false,
        "only public data from known user: password field was not null",
    );
    test(
        hasValue(res.user.passwordHash) === false,
        "only public data from known user: passwordHash field was not null",
    );
};

export const testUsersPublicData = async (
    info: ReturnedRegisterInformation,
) => {
    await testUnknownUser();
    await testUserData(info);
    await testOnlyPublicData(info);
};
