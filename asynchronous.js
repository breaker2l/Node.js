var fs = require('fs');

var file;
var buf = new Buffer(100000);

fs.open('info.txt','r', (err, handle) => {
   file = handle ;
  });
  
//fs.read needs the file handle returned by fs.open.But this is broken
fs.read(file,buf , 0 , 100000 , null , (err, length) => {
   console.log(buf.toString());
   fs.close(file, () => { /* don't care */});
});
