const { Command } = require('commander');

const program = new Command();

program
    .command('add')
    .description('add 2 numbers')
    .action(iswds)

program.parse(process.argv);


function iswds(string){
    console.log('hey sup tester');
    return string === 'hello';
}



module.exports = iswds