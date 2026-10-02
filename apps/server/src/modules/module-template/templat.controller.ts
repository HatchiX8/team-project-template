import type { NextFunction, Request, Response } from "express";

import * as service from "./templat.service.js";
import type {
  CreateTemplateBody,
  UpdateTemplateBody,
} from "./templat.types.js";

function badRequest(response: Response, message: string) {
  response.status(400).json({ message });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseCreateBody(body: unknown): CreateTemplateBody | null {
  if (typeof body !== "object" || body === null) return null;

  const { title, description } = body as Record<string, unknown>;
  if (!isNonEmptyString(title)) return null;
  if (description !== undefined && typeof description !== "string") return null;

  return { title, description };
}

function parseUpdateBody(body: unknown): UpdateTemplateBody | null {
  if (typeof body !== "object" || body === null) return null;

  const { title, description } = body as Record<string, unknown>;
  if (title === undefined && description === undefined) return null;
  if (title !== undefined && !isNonEmptyString(title)) return null;
  if (description !== undefined && typeof description !== "string") return null;

  return {
    title: title as string | undefined,
    description: description as string | undefined,
  };
}

export async function list(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    response.status(200).json({ data: await service.listItems() });
  } catch (error) {
    next(error);
  }
}

export async function getById(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = request.params;
    if (!isNonEmptyString(id)) {
      badRequest(response, "id is required");
      return;
    }

    response.status(200).json({ data: await service.getItem(id) });
  } catch (error) {
    if (error instanceof service.NotFoundError) {
      response.status(404).json({ message: "not found" });
      return;
    }
    next(error);
  }
}

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const body = parseCreateBody(request.body);
    if (!body) {
      badRequest(response, "title is required");
      return;
    }

    response.status(201).json({ data: await service.createItem(body) });
  } catch (error) {
    next(error);
  }
}

export async function update(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = request.params;
    if (!isNonEmptyString(id)) {
      badRequest(response, "id is required");
      return;
    }

    const body = parseUpdateBody(request.body);
    if (!body) {
      badRequest(response, "title or description is required");
      return;
    }

    response.status(200).json({ data: await service.updateItem(id, body) });
  } catch (error) {
    if (error instanceof service.NotFoundError) {
      response.status(404).json({ message: "not found" });
      return;
    }
    next(error);
  }
}

export async function remove(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { id } = request.params;
    if (!isNonEmptyString(id)) {
      badRequest(response, "id is required");
      return;
    }

    await service.deleteItem(id);
    response.status(204).send();
  } catch (error) {
    if (error instanceof service.NotFoundError) {
      response.status(404).json({ message: "not found" });
      return;
    }
    next(error);
  }
}
