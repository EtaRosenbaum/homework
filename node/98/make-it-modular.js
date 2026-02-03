const myModule = require('./myModule');

myModule(process.argv[2], process.argv[3],(err, files)=>{
    if(err){
        return console.log(err);
    }

    files.forEach(file => {
        console.log(file);
    });
})