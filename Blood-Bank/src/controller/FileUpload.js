const multer = require("multer");
const fromdata = multer();

var FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        if (file.mimetype === "image/jpeg") {
            filetype = "jpeg";
        }
        if (file.mimetype === "image/png") {
            filetype = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "jpg";
        }
        cb(null, "image-" + Date.now() + "." + filetype);
    },
});
exports.upload = multer({ storage: FileStorage });