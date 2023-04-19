import { type CategoryModel, categoryModelSchema } from "$lib/models/db/menu.model";
import { BaseService } from "./base.service";

class CategoryService extends BaseService<CategoryModel> {
    constructor() { super("categories", categoryModelSchema) }
}

export const categoryService = new CategoryService();
