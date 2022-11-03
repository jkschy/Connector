import fs from "fs"

class StylesheetLoader {
    path: string

    constructor(path: string) {
        this.path = path
    }

    toString() {
        return fs.readFileSync(process.cwd() + "/" + this.path).toString()
    }
}

export default StylesheetLoader