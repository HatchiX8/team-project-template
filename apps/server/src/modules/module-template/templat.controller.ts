import type { NextFunction, Request, Response } from "express";

import * as service from "./templat.service.js";

export async function list(
  _request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const result = await service.listItems();
    response.status(200).json({ data: result });
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
    // 檢驗參數的邏輯
    const { id } = request.params;
    const result = await service.getItem(id as string);
    response.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function create(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    // 檢驗參數的邏輯
    const result = await service.createItem(request.body);
    response.status(201).json({ data: result });
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
    // 檢驗參數的邏輯
    const { id } = request.params;
    const result = await service.updateItem(id as string, request.body);
    response.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    // 檢驗參數的邏輯
    const { id } = request.params;
    const result = await service.deleteItem(id as string);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
}
