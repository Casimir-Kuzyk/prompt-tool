const program = require('commander');

program
    .Command('add <number1> <number2>')
    .description('add 2 numbers')
    .action(iswds)

program.parse(process.argv);


function iswds(string){
    console.log('hey sup tester');
    return string === 'hello';
}



module.exports = iswds