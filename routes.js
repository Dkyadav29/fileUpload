const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {upload} = require('./controllers/upload');
router.post('/register', [
    body('name',"The must be bigger  three char")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected....!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded..!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }

    });
});

router.delete('/delete/:file', (req, res, next) => {
    const deletefile = 'public/uploads/' + req.params.file;
    fs.unlink(deletefile, (err) => {
        if (err) { return err }
        fs.readdir('/public/uploads', (err, files) => {
            res.send(req.params.file + ' is Deleted')
        })
    })
})

module.exports = router;