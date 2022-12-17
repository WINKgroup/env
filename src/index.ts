/***
 * @version 1.4
 */

import * as dotenv from 'dotenv'
import fs from 'fs'

export default class Env {
    static loaded = false
    static configFilePath = '.env'

    private constructor() {}

    private static loader() {
        if (fs.existsSync(this.configFilePath)) {
            const env = dotenv.config({path: this.configFilePath})
            if (env.error) console.warn( env.error )
        }
            else console.warn(`no config file at ${ this.configFilePath }`)
        this.loaded = true
    }

    static get(key:string, defaultValue?:any) {
        if (!this.loaded) this.loader()
        let value = process.env ? process.env[key] : undefined
        if (typeof value === 'undefined' && typeof defaultValue !== 'undefined')  value = defaultValue
        if (typeof value === 'undefined') throw new Error(`Env key "${key}" is not set!`)
        return value
    }

    static updateEnvLines(source:string, updater:{[key: string]: string}) {
        const lines = source.split("\n")
        const result = [] as string[]
        console.log(updater)
        for(const line of lines) {
            if (!line) continue
            const pair = line.split('=')
            if (pair.length < 2) throw new Error(`wrong splitting line: "${ line }"`)

            const key = pair[0]
            if (!updater[key] || pair.length > 2 || pair[1]) result.push(line)
                else result.push( `${ key }=${ updater[key] }` )
        }

        return result.join("\n")
    }
}