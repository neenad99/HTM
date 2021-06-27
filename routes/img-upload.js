const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    let path = './uploads/';
    cb(null,path);
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(extname && mimetype){
    return cb(null,true);
  }

  return cb('Error:Upload Images only',false);
};

const upload = multer({
  storage:storage,
  fileFilter:fileFilter
}).single('myImage');

module.exports = upload;
