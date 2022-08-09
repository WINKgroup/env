/***
 * @version 1.4
 */
export default class Env {
    static loaded: boolean;
    static configFilePath: string;
    private constructor();
    private static loader;
    static get(key: string, defaultValue?: any): string;
    static updateEnvLines(source: string, updater: {
        [key: string]: string;
    }): string;
}
