#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import invert from './invert.js';

function main () {
    const argv = yargs(process.argv.slice(2)).option('types', {
        type: 'array',
        description: "types of files that you want to reverse"
    }).argv;
    const filepath = argv._[0]
    if (filepath == undefined) {
        console.error("Please specify filepath")
    }
    console.log(argv.types)
    console.log(filepath)
    fs.readdir(filepath, (err, files) => {
        if (err) {
            if (err.code === "ENOTDIR") {
                if (argv.types) {
                    for (var file_type of argv.types) {
                        if (filepath.includes(file_type)) {
                            invert(filepath)
                        }
                    }
                } else {
                    invert(filepath)
                }
                
            } else {
                console.log(err)
            }
        } else {
            if (argv.types) {
                for (var file_type of argv.types) {
                    for await (var file of files) {
                        if (file.includes(file_type)) {
                            invert(file)
                        }
                    }
                }
            } else {
                for await (var file of files) {
                    invert(file)
                }
            }
        }
    })
}

main()
