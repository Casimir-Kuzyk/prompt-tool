#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const copyPaste = require('copy-paste');

const program = new Command();

program
    .arguments('[files...]')
    .description('takes all the requested files in the folder and compiles them into a file called compiled-files, and also copies to your clipboard')
    .action(combiner)

function combiner(files){

        // If no files are passed as arguments, get all files in current directory
        if (!files || files.length === 0) {
            const currentDir = process.cwd();
            files = fs.readdirSync(currentDir);
        }
        
        // Combine text from input files
        const combinedText = files.reduce((acc, file) => {
            const filePath = path.resolve(process.cwd(), file);
            const fileText = fs.readFileSync(filePath, 'utf-8');
            const extension = path.extname(filePath);
            const fileType = extension ? ` from a ${extension.slice(1)} file` : '';
            return `${acc}\n\n//// The below text is${fileType}\n${fileText}`;
            }, '');
        
            // Write combined text to output file
            //const outputFilePath = path.resolve(process.cwd(), 'combined-files.txt');
            const outputFilePath = path.resolve(require('os').homedir(), 'Desktop', 'combined-files.txt');
            fs.writeFileSync(outputFilePath, combinedText);
            copyPaste.copy(combinedText, () => {
                console.log(`Successfully combined text from ${files.length} files into ${outputFilePath} and copied it to the clipboard`);
            });

        };

program.parse(process.argv);

module.exports = program;