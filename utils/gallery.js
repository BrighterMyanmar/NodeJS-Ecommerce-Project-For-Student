let saveMultipleFiles = () => {
    return (req,res,next) =>{
        let filenames = [];
    req.files.images.forEach((file) => {
        let filename = new Date().valueOf() + "_" + file.name;
        filenames.push(filename);
        file.mv(`./uploads/${filename}`)
    });
    req.body['images'] = filenames;
    next();
    }
}

let saveSingleFiles = () => {
    return (req, res, next) => {
        let filename = new Date().valueOf() + "_" + req.files.image.name;
        req.files.image.mv(`./uploads/${filename}`)
        req.body['image'] = filename;
        next();
    }
}

module.exports = {
    saveMultipleFiles,
    saveSingleFiles
}