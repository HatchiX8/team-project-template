import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import multer from "multer";

import type { CreateModuleUploadOptions } from "./multerType.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 附件根目錄：apps/server/public */
export const PUBLIC_ROOT = path.resolve(__dirname, "../../../public");

const MODULE_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

/**
 * 建立依模組存放附件的 multer 實例。
 * 檔案會寫入 `public/<moduleName>/`，目錄不存在時會自動建立。
 *
 * @example 上傳單個附件
 * router.post("/avatar", createModuleUpload("users").single("file"), handler);
 *
 * @example 上傳複數個附件（最多 5 個）
 * router.post("/files", createModuleUpload("orders").array("files", 5), handler);
 */
export function createModuleUpload(
  moduleName: string,
  options: CreateModuleUploadOptions = {},
) {
  if (!MODULE_NAME_PATTERN.test(moduleName)) {
    throw new Error(
      `Invalid module name "${moduleName}". Use only letters, numbers, "_" or "-".`,
    );
  }

  const { maxFileSize = 10 * 1024 * 1024, multerOptions } = options;
  const destination = path.join(PUBLIC_ROOT, moduleName);

  const storage = multer.diskStorage({
    destination(_request, _file, callback) {
      try {
        fs.mkdirSync(destination, { recursive: true });
        callback(null, destination);
      } catch (error) {
        callback(error as Error, destination);
      }
    },
    filename(_request, file, callback) {
      const extension = path.extname(file.originalname);
      const basename = path
        .basename(file.originalname, extension)
        .replace(/[^\w.\-()+ ]+/g, "_")
        .slice(0, 100);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${basename}-${uniqueSuffix}${extension}`);
    },
  });

  return multer({
    ...multerOptions,
    storage,
    limits: {
      ...multerOptions?.limits,
      fileSize: multerOptions?.limits?.fileSize ?? maxFileSize,
    },
  });
}
