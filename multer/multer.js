const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        const path = './photos';
        fs.mkdirSync(path,{recursive:true})
        cb(null,path);
    },
    filename:(req,file,cb) =>{
        const today = new Date();
        const date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
        const time = today.getHours() +'_'+today.getMinutes()+ '_'+today.getSeconds();
        const finalname = date+'_'+time+'.jpg';
        cb(null,finalname)
    }
})

exports.upload = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
})