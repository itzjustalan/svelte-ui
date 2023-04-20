import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { authInputSchema } from '$lib/models/input/user.signup';
import { genHash } from '$lib/server/utils';
import { miscService } from '$lib/services/misc.service';
import { userService } from '$lib/services/user.service';

const users: [string, string][] = [
	['user@admin.in', 'user@1234567'],
	['waiter@admin.in', 'alan69696969'],
	['chef@admin.in', 'alan69696969']
];

const gen_users = async () => {
	users.forEach(async (user) => {
		const result = authInputSchema.safeParse({
			username: user[0],
			password: user[1]
		});
		if (result.success) userService.createNew(user[0], await genHash(user[1]));
		else log.error('error seeding data:', result.error);
	});
};
export const seedDataDevMode = async () => {
	if (!dev) {
		return;
	}
	await miscService.setAppData();
	await gen_users();
};
