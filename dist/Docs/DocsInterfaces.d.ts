import HTTPStatus from "../HTTP/HTTPStatus";
import HTTPVerb from "../HTTP/HTTPVerb";
/**
 * Interface for Route doc
 *
 * @deprecated
 */
export interface IRouteDoc {
    verb: HTTPVerb;
    path: string;
    description?: string;
    summary?: string;
    methodName?: string;
    controllerName?: string;
    parameters?: Record<string, IParameterDoc>;
    query?: Record<string, IQueryParameterDoc>;
    request?: Record<string, IBodyDoc>;
    errors?: Record<string, string>;
    response?: Record<string, IBodyDoc>;
    responseStatus?: HTTPStatus;
    isAuthenticated: boolean;
    bearerSpecific: boolean;
    basicSpecific: boolean;
    tag?: string;
}
/**
 * Enum representing a Parameter Type
 *
 * @deprecated
 * @enum
 */
export declare enum ParameterType {
    STRING = "string",
    NUMBER = "number"
}
/**
 * Enum representing a Query Parameter Type
 *
 * @deprecated
 * @enum
 */
export declare enum QueryParameterType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    INTEGER = "integer",
    NULL = "null",
    OBJECT = "object",
    ARRAY = "array"
}
/**
 * Enum representing a Body Parameter Type
 *
 * @deprecated
 * @enum
 */
export declare enum BodyParameterType {
    STRING = "string",
    NUMBER = "number",
    SCHEMA = "schema",
    BOOLEAN = "boolean",
    INTEGER = "integer",
    NULL = "null",
    OBJECT = "object",
    ARRAY = "array"
}
/**
 * Interface representing a Parameter doc
 *
 * @deprecated
 */
export interface IParameterDoc {
    name: string;
    description?: string;
    type?: ParameterType;
}
/**
 * Interface representing a Query Parameter doc
 *
 * @deprecated
 */
export interface IQueryParameterDoc {
    name: string;
    description?: string;
    type?: QueryParameterType;
    isArray?: boolean;
    isRequired?: boolean;
}
/**
 * Interface representing a Body doc
 */
export interface IBodyDoc {
    name: string;
    description?: string;
    type?: BodyParameterType;
    schema?: string;
    default?: string;
    required?: boolean;
    enumOptions?: Array<string>;
    arrayType?: BodyParameterType;
}
/**
 * Interface representing an Interface doc
 *
 * @deprecated
 */
export interface IInterfaceDoc {
    name: string;
    description?: string;
    type?: BodyParameterType;
    properties: Array<IBodyDoc>;
}
/**
 * Interface representing a Route definition
 *
 * @deprecated
 */
export interface IRouteDefinition {
    name: string;
    description: string;
    path: string;
    isAPI: boolean;
    routes: Array<IRouteDoc>;
}
/**
 * Interface used to define swagger parameters.
 *
 * @deprecated
 */
export interface ISwaggerParameter {
    name: string;
    in: string;
    description: string;
    required?: boolean;
    schema: Record<string, any>;
}
/**
 * Type used to define a Routes list
 *
 * @deprecated
 */
export declare type TRoutesList = Record<string, IRouteDefinition>;
/**
 * The default identifier for a the Response body when using interfaces for responses.
 *
 * @deprecated
 */
export declare const DEFAULT_BODY_TAG = "__DEFAULT__";
