import { API_URL } from "./api_url.ts";

export const randomUsername = () => {
    return "test_user_" + Math.floor(Math.random() * 1000);
};

export const test = (ok: boolean, msg: string) => {
    if (!ok) {
        console.log(`test failed: ${msg}`);
    }
};

export const hasValue = (t: any): boolean => {
    return t !== null && t !== undefined;
};

export const jsonHeaders = () =>
    new Headers({ "Content-Type": "application/json" });

export const jsonAuthHeaders = (token: string) =>
    new Headers({ "Content-Type": "application/json", token: token });

interface ValueFields {
    [key: string]: any;
}

export const bulkTestIncompleteValues = async (
    endpoint: string,
    headers: Headers,
    values: ValueFields,
) => {
    for (let i = 0; i < 3; i++) {
        for (let key in values) {
            const body = { ...values };

            switch (i) {
                case 0:
                    body[key] = null;
                    break;
                case 1:
                    body[key] = undefined;
                    break;
                case 2:
                    delete body[key];
                    break;
            }

            let res = await (
                await fetch(API_URL + endpoint, {
                    headers,
                    body: body as unknown as BodyInit,
                })
            ).json();

            let word = "";
            switch (i) {
                case 0:
                    word = "null";
                    break;
                case 1:
                    word = "undefined";
                    break;
                case 2:
                    word = "delete";
                    break;
            }

            test(
                res.ok === false,
                `bulk incomplete (${word}) values with '${endpoint}' failed: response was OK with field '${key}'`,
            );
            test(
                res.error !== "Incomplete",
                `bulk incomplete (${word}) values with '${endpoint}' failed: expected error 'Incomplete', was '${res.error}' with field '${key}'`,
            );
        }
    }
};
