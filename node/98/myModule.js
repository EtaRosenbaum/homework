const fs = require('fs');
const path = require('path');


module.exports = function(dir, ext, callback) {
    fs.readdir(dir,(err, files)=>{
        if(err){
            return callback(err);
        }
        const filtered = files.filter(file => path.extname(file) === '.' + ext);
        callback(null, filtered);

    })


}
