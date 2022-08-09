"use strict";
/***
 * @version 1.4
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var Env = /** @class */ (function () {
    function Env() {
    }
    Env.loader = function () {
        var env = dotenv.config({ path: this.configFilePath });
        if (env.error)
            console.warn(env.error);
        this.loaded = true;
    };
    Env.get = function (key, defaultValue) {
        if (!this.loaded)
            this.loader();
        var value = process.env ? process.env[key] : undefined;
        if (typeof value === 'undefined' && typeof defaultValue !== 'undefined')
            value = defaultValue;
        if (typeof value === 'undefined')
            throw new Error("Env key \"".concat(key, "\" is not set!"));
        return value;
    };
    Env.updateEnvLines = function (source, updater) {
        var lines = source.split("\n");
        var result = [];
        console.log(updater);
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (!line)
                continue;
            var pair = line.split('=');
            if (pair.length < 2)
                throw new Error("wrong splitting line: \"".concat(line, "\""));
            var key = pair[0];
            if (!updater[key] || pair.length > 2 || pair[1])
                result.push(line);
            else
                result.push("".concat(key, "=").concat(updater[key]));
        }
        return result.join("\n");
    };
    Env.loaded = false;
    Env.configFilePath = '.env';
    return Env;
}());
exports.default = Env;
