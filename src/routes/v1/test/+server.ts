import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	// const result = menuInputSchema.safeParse(await request.json());
    console.log(request.json())
    console.log(request.formData())
    return new Response();
};