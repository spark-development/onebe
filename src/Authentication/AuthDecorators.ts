import { NextFunction, Request, Response } from "express";
import passport from "passport";
import app from "../App";
import Route from "../Router/Route";
import { defineMiddleware } from "../Router/RouteUtils";
import IPayload from "./IPayload";
import { decode, extractToken, verify } from "./JWT";
import MetadataStore from "../Documentation/MetadataStore";
import AuthenticationMethod from "./AuthenticationMethod";

/**
 * Decorator to enable Bearer Authentication for an endpoint.
 *
 * Attaches to the property of the target the following metadata:
 * - route:auth
 * - route:auth:bearer
 *
 * Based on this metadata we know what to generate in the Documentation generator.
 *
 * @decorator
 * @param target The target on which we apply the decorator.
 * @param propertyKey The property key on which we apply the decorator.
 * @param descriptor The descriptor of the property we want to decorate.
 */
export const Bearer = (target: Route, propertyKey: string, descriptor: PropertyDescriptor): void => {
  const original = Array.isArray(descriptor.value) ? descriptor.value : [ descriptor.value ];

  MetadataStore.instance.route.endpointAuth(target.constructor.name, propertyKey, AuthenticationMethod.BEARER);
  descriptor.value = [ passport.authenticate("bearer", { session: false }), ...original ];
};

/**
 * Decorator to enable Basic Authentication for an endpoint.
 *
 * Attaches to the property of the target the following metadata:
 * - route:auth
 * - route:auth:basic
 *
 * Based on this metadata we know what to generate in the Documentation generator.
 *
 * @decorator
 * @param target The target on which we apply the decorator.
 * @param propertyKey The property key on which we apply the decorator.
 * @param descriptor The descriptor of the property we want to decorate.
 */
export const Basic = (target: Route, propertyKey: string, descriptor: PropertyDescriptor): void => {
  const original = Array.isArray(descriptor.value) ? descriptor.value : [ descriptor.value ];

  MetadataStore.instance.route.endpointAuth(target.constructor.name, propertyKey, AuthenticationMethod.BASIC);
  descriptor.value = [ passport.authenticate("basic", { session: false }), ...original ];
};

/**
 * Middleware used to extract the user from the request when using Bearer Authentication
 * on a mixed route (Public and Protected).
 *
 * @decorator
 * @param target The target on which we apply the decorator.
 * @param propertyKey The property key on which we apply the decorator.
 * @param descriptor The descriptor of the property we want to decorate.
 */
export const extractUser = defineMiddleware((req: Request, res: Response, next: NextFunction): void => {
  const token = extractToken(req);
  try {
    if (!verify(token)) {
      return next();
    }
  } catch (err) {
    return next();
  }

  const decodedToken = decode(token) as IPayload;
  if ("deserializeUser" in app) {
    app.deserializeUser(decodedToken, (err, user) => {
      if (!err) {
        req.user = user;
      }

      next();
    });
    return;
  }
  req.user = {
    ...decodedToken,
    id: decodedToken.userId || decodedToken,
  };
  next();
});
