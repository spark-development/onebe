"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineMiddleware = defineMiddleware;
exports.getPath = getPath;

/**
 * Function used to define a middleware decorator.
 *
 * @param middlewares A list of middlewares you want to apply on the route.
 */
function defineMiddleware(...middlewares) {
  return (target, propertyKey, descriptor) => {
    const original = Array.isArray(descriptor.value) ? descriptor.value : [descriptor.value];
    descriptor.value = [...middlewares, ...original];
  };
}

function getPath(...pathElements) {
  const newPath = pathElements.filter(path => path.length).join("/").replace(/(https?:\/\/)|(\/)+/g, "$1$2");
  return newPath.lastIndexOf("/") === newPath.length - 1 && newPath !== "/" ? newPath.substring(0, newPath.length - 1) : newPath;
}