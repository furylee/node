const glob = require("glob");
const { time, timeEnd } = require("console");

var result = null;
time("glob")
console.log(glob(__dirname + '/**/*',function(err,res){
    console.log(res);
}));
timeEnd("glob")
console.log(1 + 1);
