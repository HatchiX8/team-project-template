import type {
  CreateTemplateBody,
  TemplateItem,
  UpdateTemplateBody,
} from "./templat.types.js";

/** 尚未接 DB，先用記憶體模擬 */
const items: TemplateItem[] = [];

export async function findAll(): Promise<TemplateItem[]> {
  return [...items];
}

export async function findById(id: string): Promise<TemplateItem | null> {
  return items.find((item) => item.id === id) ?? null;
}

export async function create(data: CreateTemplateBody): Promise<TemplateItem> {
  const item: TemplateItem = {
    id: String(items.length + 1),
    title: data.title,
    description: data.description ?? "",
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  return item;
}

export async function update(
  id: string,
  data: UpdateTemplateBody,
): Promise<TemplateItem | null> {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;

  items[index] = { ...items[index]!, ...data };
  return items[index]!;
}

export async function remove(id: string): Promise<boolean> {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return false;

  items.splice(index, 1);
  return true;
}
