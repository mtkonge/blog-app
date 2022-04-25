import { randomUsername } from "./utils.ts";

import { testRegister } from "./endpoints/register.ts";
import { testUsersPublicData } from "./endpoints/users_public_data.ts";
import { testSessionLogin } from "./endpoints/session_login.ts";

const main = async () => {
    const testuser = {
        username: randomUsername(),
        password: "password1234",
    };
    const userInfo = await testRegister(testuser);
    const sessionLoginInfo = await testSessionLogin(testuser);
    await testUsersPublicData(userInfo);
};

main();
