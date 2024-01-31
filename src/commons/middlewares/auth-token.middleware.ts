import type { Request, Response } from "express";
import {
  Injectable,
  type NestMiddleware,
  BadRequestException,
} from "@nestjs/common";

export const X_AUTH_TOKEN = "x-auth-token";

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authToken = req.headers[X_AUTH_TOKEN] as string;
    if (!authToken || authToken !== process.env.X_AUTH_TOKEN)
      throw new BadRequestException("Invalid X-Auth-Token");
    next();
  }
}
