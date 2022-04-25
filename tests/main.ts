import { Cookie, CookieJar, wrapFetch } from "./deps.ts";

import { randomUsername } from "./utils.ts";

import { testRegister } from "./tests/register.ts";

const main = () => {
    const cookieJar = new CookieJar();
    const fetch = wrapFetch({ cookieJar });
    const username = randomUsername();
    testRegister(username, cookieJar);
};

main();
