import { type Category, categorySchema } from "$lib/zod/models/menu.model";
import { BaseService } from "./base.service";

class CategoryService extends BaseService<Category> {
    constructor() { super("categories", categorySchema) }
}

export const categoryService = new CategoryService();
