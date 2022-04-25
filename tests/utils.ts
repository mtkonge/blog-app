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
    for (let key in values) {
        const body = { ...values };
        body[key] = null;
        let res = await (
            await fetch(apiUrl, {
                headers,
                body: body as unknown as BodyInit,
            })
        ).json();

        test(
            res.ok === false,
            `bulk incomplete (null) values with '${endpoint}' failed: response was OK with field '${key}'`,
        );
        test(
            res.error !== "Incomplete",
            `bulk incomplete (null) values with '${endpoint}' failed: expected error 'Incomplete', was '${res.error}' with field '${key}'`,
        );
    }

    for (let key in values) {
        const body = { ...values };
        body[key] = undefined;
        let res = await (
            await fetch(apiUrl, {
                headers,
                body: body as unknown as BodyInit,
            })
        ).json();

        test(
            res.ok === false,
            `bulk incomplete (undefined) values with '${endpoint}' failed: response was OK with field '${key}'`,
        );
        test(
            res.error !== "Incomplete",
            `bulk incomplete (undefined) values with '${endpoint}' failed: expected error 'Incomplete', was '${res.error}' with field '${key}'`,
        );
    }
};
