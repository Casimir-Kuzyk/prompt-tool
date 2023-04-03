#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
    .arguments('<files...>')
    .description('takes all the requested files in the folder and compiles them into a file called compiled-files, and also copies to your clipboard')
    .action(combiner)

function combiner(files){
        // Combine text from input files
        const combinedText = files.reduce((acc, file) => {
            const filePath = path.resolve(process.cwd(), file);
            const fileText = fs.readFileSync(filePath, 'utf-8');
            const extension = path.extname(filePath);
            const fileType = extension ? ` from a ${extension.slice(1)} file` : '';
            return `${acc}\n\n// The below text is${fileType}\n${fileText}`;
            }, '');
        
            // Write combined text to output file
            //const outputFilePath = path.resolve(process.cwd(), 'combined-files.txt');
            const outputFilePath = path.resolve(require('os').homedir(), 'Desktop', 'combined-files.txt');
            fs.writeFileSync(outputFilePath, combinedText);
            console.log(`Successfully combined text from ${files.length} files into ${outputFilePath}`);
        };

module.exports = combiner;