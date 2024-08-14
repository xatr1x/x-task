import * as express from 'express';
import { UserTokenPayload } from '../../interfaces/UserTokenPayload';

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}

declare namespace Multer {
  export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  }
}
