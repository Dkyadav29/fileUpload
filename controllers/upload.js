const multer = require('multer');
// Init Upload that mean image formate and size 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('upload');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /pdf|xls|doc/
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only......!');
    }
}
 
module.exports = upload;