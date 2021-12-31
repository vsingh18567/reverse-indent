import fs from 'fs'
import readline from 'readline'

const getIndent = async (file) => {
    const fileStream = fs.createReadStream(file)
    const rd = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (let line of rd) {
        let status = false
        
    }
}

export default (file) => {
    getIndent(file);
}