import type { Options } from "multer";

export type CreateModuleUploadOptions = {
  /** 單檔大小上限（bytes），預設 10MB */
  maxFileSize?: number;
  /** 其餘 multer 選項（storage 會被覆蓋） */
  multerOptions?: Omit<Options, "storage">;
};
