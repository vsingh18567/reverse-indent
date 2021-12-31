import fs from 'fs'
import readline from 'readline'



async function getIndents (file, cb) {
    const fileStream = fs.createReadStream(file)
    const rd = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let indent = null
    let indents = []
    let maxIndents = 0;

    for await (let line of rd) {
        let count = 0;
        if (indent == null) {
            if (line.charAt(0) === '\t') {
                indent = '\t'
            } else if (line.charAt(0) === ' ') {
                indent = ' '
            }
        }

        if (indent) {
            for (let char of line) {
                if (char === indent) {
                    count++
                } else {
                    break
                }
            }
        }

        indents.push(count)
        if (count > maxIndents) {
            maxIndents = count;
        }
    }
    if (!indent) {
        indent = ' '
    }

    cb(file, indent, indents, maxIndents)

}

async function writeToFile(des, file, indent, indents) {
    const fileStream = fs.createReadStream(file)
    const rd = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let i = 0;

    for await (let line of rd) {
        let charI = 0;
        while (line.charAt(charI) === indent) {
            charI++
        }
        let newLine = indent.repeat(indents[i]) + line.slice(charI) + "\n"
        fs.writeFileSync(des, newLine, (err) => {
            if (err) {
                console.log(err)
            }
        })
        i++
    }

    fs.unlink(file, (err) => {
        console.log(err)
    })

    fs.rename(file + "_", file, (err) => {
        console.log(err)
    })
}

async function fixIndents(file, indent, indents, maxIndents) {
    for (let i = 0; i < indents.length; i++) {
        indents[i] = maxIndents - indents[i]
    }

    const newFile = file + "_"
    fs.open(newFile, 'wx', (err, des) => {
        if (!err & des) {
            writeToFile(des, file, indent, indents)
            
        } else {
            console.log(err)
        }
    })





}

export default (file) => {
    getIndents(file, fixIndents);
}