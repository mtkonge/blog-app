import { API_URL } from "../api_url.ts";
import { randomUsername, test, hasValue, jsonHeaders } from "../utils.ts";

export type RequiredSessionLoginInformation = {
    username: string;
    password: string;
};

export type ReturnedSessionLoginInformation = {
    token: string;
};

export const testSessionLoginUnknown = async ({
    password,
}: RequiredSessionLoginInformation) => {
    const res = await (
        await fetch(API_URL + "/sessions/login", {
            headers: jsonHeaders(),
            method: "POST",
            body: JSON.stringify({
                username: randomUsername(),
                password,
            }),
        })
    ).json();
    test(res.ok !== false, "session login w unknown user respone was ok");
    test(
        hasValue(res.error),
        "session login w unknown user respone didn't contain error field",
    );
    test(
        res.error === "Unknown username/password",
        `session login w unknown user: error was ${res.error}, expected Unknown username/password`,
    );
};

export const testSessionLoginCorrect = async ({
    username,
    password,
}: RequiredSessionLoginInformation): Promise<ReturnedSessionLoginInformation> => {
    const res = await (
        await fetch(API_URL + "/sessions/login", {
            headers: jsonHeaders(),
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        })
    ).json();
    test(res.ok === false, "valid session login respone was not ok");
    // TODO check for each individual field
    return {
        token: res.token,
    };
};

export const testSessionLogin = async (
    req: RequiredSessionLoginInformation,
): Promise<ReturnedSessionLoginInformation> => {
    await testSessionLoginUnknown(req);
    return await testSessionLoginCorrect(req);
};
