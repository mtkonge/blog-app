import { randomUsername } from "./utils.ts";

import { testRegister } from "./endpoints/register.ts";
import { testUsersPublicData } from "./endpoints/users_public_data.ts";

const main = async () => {
    const userInfo = await testRegister();
    await testUsersPublicData(userInfo);
};

main();
