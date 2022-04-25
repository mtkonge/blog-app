import { randomUsername } from "./utils.ts";

import { testRegister } from "./endpoints/register.ts";
import { testPublicData } from "./endpoints/publicData.ts";

const main = async () => {
    const userInfo = await testRegister();
    await testPublicData(userInfo);
};

main();
