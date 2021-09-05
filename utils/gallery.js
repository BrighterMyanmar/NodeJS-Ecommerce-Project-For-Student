const fs = require('fs');

let saveMultipleFiles = () => {
   return (req, res, next) => {
      let filenames = [];
      if (req.files) {
         req.files.images.forEach((file) => {
            let filename = new Date().valueOf() + "_" + file.name;
            filenames.push(`http://${process.env.SERVER_IP}:3000/uploads/${filename}`);
            file.mv(`./uploads/${filename}`)
         });
         req.body['images'] = filenames;
         next();
      } else {
         next(new Error("Product must have at least one file!"));
      }

   }
}

let deleteMultipleFiles = async (names) => {
   names.forEach(async (name) => {
      await deleteSingleFile(name);
   });
}

let deleteSingleFile = async (name) => {
   let filename = name.split('/')[name.split('/').length - 1];
   let filepath = `./uploads/${filename}`;
   await fs.unlinkSync(filepath);
}

let saveSingleFiles = () => {
   return (req, res, next) => {
      let filename = new Date().valueOf() + "_" + req.files.image.name;
      req.files.image.mv(`./uploads/${filename}`)
      req.body['image'] = `http://${process.env.SERVER_IP}:3000/uploads/${filename}`;
      next();
   }
}


module.exports = {
   saveMultipleFiles,
   saveSingleFiles,
   deleteSingleFile,
   deleteMultipleFiles
}