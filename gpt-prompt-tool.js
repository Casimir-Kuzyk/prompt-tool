#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const program = new Command();

program
    .arguments('[files...]')
    .description('takes all the requested files in the folder and compiles them into a file called compiled-files, and also copies to your clipboard')
    .action(combiner)

function combiner(files){

    // If no files are passed as arguments, get all files in current directory
    if (!files || files.length === 0) {
        const currentDir = process.cwd();
        files = walk(currentDir);
    } else {
        // If files are passed as arguments, get all files including those in subdirectories
        files = files.reduce((acc, file) => {
            const stat = fs.statSync(file);
            if (stat.isDirectory()) {
                const subDirFiles = walk(file);
                return [...acc, ...subDirFiles];
            } else {
                return [...acc, file];
            }
        }, []);
    }
        
    // Combine text from input files
    const combinedText = files.reduce((acc, file) => {
        const filePath = path.resolve(process.cwd(), file);
        const fileText = fs.readFileSync(filePath, 'utf-8');
        const extension = path.extname(filePath);
        const fileType = extension ? ` from a ${extension.slice(1)} file` : '';
        const dirPath = path.dirname(filePath);
        return `${acc}\n\n//// The below text is${fileType} from ${dirPath}\n${fileText}`;
        }, '');
    
    // Write combined text to output file
    //const outputFilePath = path.resolve(process.cwd(), 'combined-files.txt');
    const outputFilePath = path.resolve(require('os').homedir(), 'Desktop', 'combined-files.txt');
    fs.writeFileSync(outputFilePath, combinedText);
    
    //copy to clipboard... this is a linux only command! Future update could include commands for windows + macOS
    const child = spawn('xclip', ['-in', '-selection', 'clipboard']);
    child.stdin.write(combinedText);
    child.stdin.end();
    child.on('exit', () => {
        console.log(`Successfully combined text from ${files.length} files into ${outputFilePath} and copied it to the clipboard`);
        process.exit();
    });
        
};

function walk(dir) {
    let files = fs.readdirSync(dir);
    files = files.map(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            return walk(filePath);
        } else {
            return filePath;
        }
    });
    return files.flat();
}

program.parse(process.argv);

module.exports = program;
