import * as repository from "@/modules/module-template/templat.repository.js";
import type {
  CreateTemplateBody,
  TemplateItem,
  UpdateTemplateBody,
} from "@/modules/module-template/templat.types.js";

export async function listItems(): Promise<TemplateItem[]> {
  try {
    const result = await repository.findAll();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getItem(id: string): Promise<TemplateItem> {
  try {
    const result = await repository.findById(id);
    if (!result) throw new Error("not found");
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createItem(
  body: CreateTemplateBody,
): Promise<TemplateItem> {
  try {
    const result = await repository.create({
      title: body.title.trim(),
      description: body.description?.trim() ?? "",
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateItem(
  id: string,
  body: UpdateTemplateBody,
): Promise<TemplateItem> {
  try {
    const result = await repository.update(id, {
      title: body.title?.trim(),
      description: body.description?.trim(),
    });
    if (!result) throw new Error("not found");
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteItem(id: string): Promise<void> {
  try {
    const result = await repository.remove(id);
    if (!result) throw new Error("not found");
  } catch (error) {
    throw error;
  }
}
