import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { authInputSchema } from '$lib/models/input/user.signup';
import { genHash } from '$lib/server/utils';
import { miscService } from '$lib/services/misc.service';
import { userService } from '$lib/services/user.service';
import { users } from '$lib/utils/seeds/users.json';
import { menus, categories, menuItems, menuItemTypes } from '$lib/utils/seeds/menus.json';
import {
	categoryModelSchema,
	menuItemModelSchema,
	menuItemTypeModelSchema,
	menuModelSchema,
} from '$lib/models/db/menu.model';
import { menuService } from '$lib/services/menu.service';
import { categoryService } from '$lib/services/category.service';
import { menuItemService } from '$lib/services/menuitem.service';
import { menuItemTypeService } from '$lib/services/menuitemtype.service';

const gen_users = async () => {
	await Promise.allSettled(
		users.map(async (user) => {
			const result = authInputSchema.safeParse({
				username: user[0],
				password: user[1],
			});
			if (result.success) await userService.createNew(user[0], await genHash(user[1]));
			else log.error('error seeding data:', result.error);
		})
	);
};

const gen_menus = async () => {
	await Promise.allSettled([
		...menus.map(async (menu) => {
			log.warn({ menu });
			const result = menuModelSchema.safeParse(menu);
			if (result.success) await menuService.createOrUpdate(menu);
			else log.error('error seeding menu', menu.title, result.error);
		}),
		...categories.map(async (category) => {
			log.warn({ category });
			const result = categoryModelSchema.safeParse(category);
			if (result.success) await categoryService.createOrUpdate(category);
			else log.error('error seeding menu', category.title, result.error);
		}),
		...menuItems.map(async (menuitem) => {
			log.warn({ menuitem });
			const result = menuItemModelSchema.safeParse(menuitem);
			if (result.success) await menuItemService.createOrUpdate(result.data);
			else log.error('error seeding menu', menuitem.title, result.error);
		}),
		,
		...menuItemTypes.map(async (menuItemType) => {
			log.warn({ menuItemType });
			const result = menuItemTypeModelSchema.safeParse(menuItemType);
			if (result.success) await menuItemTypeService.createOrUpdate(result.data);
			else log.error('error seeding menu', menuItemType.title, result.error);
		}),
	]);
};
export const seedDataDevMode = async () => {
	if (!dev) {
		return;
	}
	const appData = await miscService.getAppData();
	if (appData?.seeded) {
		log.warn('seed found! aborting...');
		return;
	}
	const promises = [];
	log.warn('seeding db!!');
	promises.push(gen_users());
	promises.push(gen_menus());
	await Promise.allSettled(promises);
	await miscService.setAppData({ seeded: true });
};
