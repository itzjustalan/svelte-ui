import { dev } from '$app/environment';
import { genHash } from '$lib/server/utils';
import { userService } from '$lib/services/user.service';

export const seedDataDevMode = async () => {
	if (!dev) {
		return;
	}
	userService.createNew('user@admin.in', await genHash('user@1234567'));
	userService.createNew('waiter@admin.in', await genHash('alan69696969'));
	userService.createNew('chef@admin.in', await genHash('alan69696969'));
	userService.createNew('admin@admin.in', await genHash('adwaith12345'));
};
