import { UserService } from "$lib/services/user.service";

interface Credentials {
    username: string,
    password: string,
}

export class AuthController {
    userService: UserService;
    constructor() {
        console.log('auth ctrlr crtd')
        this.userService = new UserService();
    }

    async signup(credentials: Credentials): Promise<number> {
        const { username, password } = credentials;

        // await this.userService.createNewUser(username, password);
        // await this.userService.findAllUsers();
        console.log(await this.userService.findById('users:722o0i1tfyhk25czo5cr'))
        return 0;

        // check if username exists
        // const u = await this.userService.findOneByUsername(username) ?? [];
        // if (u[0].error) { console.log('errr', u[0].error); }
        // console.log(JSON.stringify(u[0]))
        // console.log(u[0].result)
        // console.log(u.result.length)


        console.log(username, password)
        return 1;
    }
}
