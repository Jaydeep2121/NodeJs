const { string } = require('yargs');
const yargs = require('yargs');
const log = console.log;
const util = require('util')
/* 
    import chalk from 'chalk';
    Define "require"
    import { createRequire } from "module";
    const require = createRequire(import.meta.url);
    const add = require('./utils.js');
    console.log(add(4,-2));
    console.log(validator.isEmail('jaydipc95@gm.com'));
    log(chalk.red.inverse.bold('hii Occured!!'));
    log(process.argv);

    const command = process.argv[2];
    log(process.argv);
    if(command==='add'){
        log('adding notes');
    }else if(command==='remove'){
        log('removing notes');
    }
    log(yargs.argv);
*/

//create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        MyTitle:{
            describe:'notes title',
            demandOption:true,
            type:'string' //force to be a string
        },
        body:{
            describe:'notes body',
            demandOption:true,
            type:'string'   
        }
    },
    handler:function(argv){
        log('adding a new note :'+util.inspect(argv.MyTitle, {depth: null}));
        log('body of note:'+util.inspect(argv.body, {depth: null}));
        //depth: null tell util.inspect to open everything until it get to a circular reference, the result can be quite long however
    }
})
//create remove command
yargs.command({
    command:'remove',
    describe:'remove a note',
    handler:function(){
        log('removing a new note');
    }
})
//create read command
yargs.command({
    command:'read',
    describe:'read a note',
    handler:function(){
        log('reading a new note');
    }
})
//create list command
yargs.command({
    command:'list',
    describe:'list a note',
    handler:function(){
        log('listing a new note');
    }
})
//add,remove,read

yargs.parse();

