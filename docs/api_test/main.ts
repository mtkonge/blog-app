import { randomUsername } from "./utils.ts";

import { testRegister } from "./tests/register.ts";

const main = async () => {
    const testUserInfo = await testRegister();
};

main();
