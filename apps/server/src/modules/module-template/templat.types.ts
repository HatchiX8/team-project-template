export type TemplateItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export type CreateTemplateBody = {
  title: string;
  description?: string;
};

export type UpdateTemplateBody = {
  title?: string;
  description?: string;
};
