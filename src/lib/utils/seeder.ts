import { dev } from '$app/environment';
import { genHash } from '$lib/server/utils';
import { userService } from '$lib/services/user.service';

export const seedDataDevMode = async () => {
	if (!dev) {
		return;
	}
	userService.createNew('halid@admin.in', await genHash('halid480'));
	userService.createNew('alan@admin.in', await genHash('alan69'));
	userService.createNew('adwaith@admin.in', await genHash('adwaith007'));
};
