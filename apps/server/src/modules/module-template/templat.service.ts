import * as repository from "./templat.repository.js";
import type {
  CreateTemplateBody,
  TemplateItem,
  UpdateTemplateBody,
} from "./templat.types.js";

export class NotFoundError extends Error {
  constructor() {
    super("NOT_FOUND");
  }
}

export async function listItems(): Promise<TemplateItem[]> {
  return repository.findAll();
}

export async function getItem(id: string): Promise<TemplateItem> {
  const item = await repository.findById(id);
  if (!item) throw new NotFoundError();
  return item;
}

export async function createItem(
  body: CreateTemplateBody,
): Promise<TemplateItem> {
  return repository.create({
    title: body.title.trim(),
    description: body.description?.trim() ?? "",
  });
}

export async function updateItem(
  id: string,
  body: UpdateTemplateBody,
): Promise<TemplateItem> {
  const item = await repository.update(id, {
    title: body.title?.trim(),
    description: body.description?.trim(),
  });
  if (!item) throw new NotFoundError();
  return item;
}

export async function deleteItem(id: string): Promise<void> {
  const removed = await repository.remove(id);
  if (!removed) throw new NotFoundError();
}
