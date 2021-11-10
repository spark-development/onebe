import { Application } from "express";
import IMiddleware from "./IMiddleware";
/**
 * The i18n middleware.
 */
export default class I18nMiddleware implements IMiddleware {
    /**
     * The middleware initialization method.
     *
     * @param app The express application on which we apply the middleware.
     */
    use(app: Application): void;
}
