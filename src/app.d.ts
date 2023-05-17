// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				role: string;
				access: string[];
			};
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
