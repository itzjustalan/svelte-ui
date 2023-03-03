import { dev } from "$app/environment";
import type { User } from "$lib/models/user.model";
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

    async signup(credentials: Credentials): Promise<User | string> {
        // await db.create('users', { ...credentials });
        const { username, password } = credentials;
        // console.log(username, password)

        try {
            if (await this.userService.findOneByUsername(username)) {
                console.log('jucer exists');
                return 'username already in use';
            }

            return await this.userService.createNewUser(username, password);
        } catch (error) {
            console.log(dev && error)
            return 'error signing up';
        }
    }
}
