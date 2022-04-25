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
