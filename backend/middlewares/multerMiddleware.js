import multer, { diskStorage } from "multer";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname ,'../assets/images'));
  },
  filename: function (req, file, cb) { 
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    let ext=file.originalname.slice(file.originalname.lastIndexOf("."))
    cb(null, uniqueSuffix + "_" + ext);
  },
});

const images = multer({storage})

const imageUpload = images.single('image');

export default imageUpload;