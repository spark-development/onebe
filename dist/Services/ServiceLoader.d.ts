import ServiceBase from "./ServiceBase";
import { Constructor } from "../Documentation/MetadataTypes";
/**
 * A system to load services into the application and reuse them as needed.
 */
export default class ServiceLoader {
    /**
     * A map containing all the instantiated services in the application.
     */
    protected _services: Record<string, ServiceBase>;
    /**
     * The protected constructor of the service loader class.
     */
    protected constructor();
    /**
     * The instance of the Service Loader.
     */
    protected static _instance: ServiceLoader;
    /**
     * Service loader instance getter.
     */
    static get instance(): ServiceLoader;
    /**
     * Static method used to get a service from the service loader.
     *
     * @param serviceNameOrClass The name of the service you want to get.
     */
    static get<T extends ServiceBase>(serviceNameOrClass: string | Constructor<T>): T;
    /**
     * Static method used to add a service to the service loader.
     *
     * @param serviceNameOrInstance The name of the service you want to add or The service instance you want to add.
     * @param serviceInstance The service instance you want to add.
     */
    static set<T extends ServiceBase>(serviceNameOrInstance: string | T, serviceInstance?: T): T;
    /**
     * Method used to get the services from the database.
     *
     * @param serviceName The name of the service.
     */
    protected _get(serviceName: string): ServiceBase;
    /**
     * Method used to add a service to the service loader.
     *
     * @param serviceName The name of the service we want to add.
     * @param serviceInstance The service instance we want to add.
     */
    protected _set<T extends ServiceBase>(serviceName: string, serviceInstance: T): T;
}
