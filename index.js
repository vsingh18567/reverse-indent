#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import fs from 'fs'
import invert from './invert.js';
import { exit } from 'process';

// reverse-indent path [types]

const readDir = (filepath, types) => {
    console.log(filepath)
    fs.readdir(filepath, (err, files) => {
        if (err) {
            if (err.code === "ENOTDIR") {
                if (types) {
                    for (var file_type of types) {
                        if (filepath.includes(file_type)) {
                            invert(filepath)
                        }
                    }
                } else {
                    invert(filepath)
                }
            } else {
                console.log(chalk.red(err))
            }
        } else {
            let count = 0;
            if (types) {
                for (var file of files) {
                    for (var file_type of types) {
                        let newPath = filepath
                        if (filepath.charAt(filepath.length - 1) !== '/') {
                            newPath = newPath + "/"
                        } 
                        newPath = newPath + file

                        if (!file.includes('.')) {
                            readDir(newPath, types)
                            break
                        }

                        if (file.includes(file_type)) {
                            invert(newPath)
                            break
                        }
                    }
                }
            } else {
                for (var file of files) {
                    let newPath = filepath
                    if (filepath.charAt(filepath.length - 1) !== '/') {
                        newPath = newPath + "/"
                    } 
                    newPath = newPath + file

                    if (!file.includes('.')) {
                        readDir(newPath, types)
                        break
                    }
                    invert(newPath)
                }
            }
        }
    })
}

const main = () => {
    const argv = yargs(process.argv.slice(2))
        .scriptName("reverse-indent")
        .usage('$0 <filepath> [options]')
        .command('./path/to/files --types ".type1" ".type2"')
        .option(chalk.green('types (optional)'), {
            type: 'array',
            describe: 'types of files to reverse indentation on (e.g. ".js")'
        })
        .argv;

    const filepath = argv._[0]
    if (filepath == undefined) {
        console.error(chalk.red("Please specify filepath"))
        exit()
    }

    readDir(filepath, argv.types)

    
}


// files
main()
