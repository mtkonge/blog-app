import { randomUsername } from "./utils.ts";

import { testRegister } from "./endpoints/register.ts";

const main = async () => {
    const userInfo = await testRegister();
};

main();
