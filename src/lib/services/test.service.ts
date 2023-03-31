import { type User, userSchema } from "$lib/zod/models/user.model";
import { BaseService } from "./base.service";

class TestService extends BaseService<User> {
    constructor() { super("users", userSchema) }
}

export const testService = new TestService();
let gg = await testService.findAll();
let gh = await testService.findOneById("");
let gk = await testService.createNew({
    password: "",
    username: "",
});
