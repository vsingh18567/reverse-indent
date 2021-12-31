#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import invert from './invert.js';

// reverse-indent path [types]


const main = () => {
    const argv = yargs(process.argv.slice(2)).option('types', {
        type: 'array'
    }).argv;

    const filepath = argv._[0]
    if (filepath == undefined) {
        console.error("Please specify filepath")
    }
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
                    for (var file of files) {
                        if (file.includes(file_type)) {
                            let newPath = filepath
                            if (filepath.charAt(filepath.length - 1) !== '/') {
                                newPath = newPath + "/"
                            } 
                            invert(newPath + file)
                        }
                    }
                }
            } else {
                for (var file of files) {
                    let newPath = filepath
                    if (filepath.charAt(filepath.length - 1) !== '/') {
                        newPath = newPath + "/"
                    } 
                    invert(newPath + file)
                }
            }

        }
    })
    
}


// files
main()
