import { Application, NextFunction, Request, Response } from "express";
import { getVersion } from "@/version";
import IMiddleware from "@/Middlewares/IMiddleware";

/**
 * Middleware used to add information about the framework.
 */
export default class OneBEMiddleware implements IMiddleware {
  /**
   * The middleware initialization method.
   *
   * @param app The express application on which we apply the middleware.
   */
  public use(app: Application): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("X-OneBE-Version", `v${ getVersion() }`);
      next();
    });
  }
}
