const cloudinary = require('cloudinary').v2;

const handleUploadMedia = async (fileList) => {
    const url_list= []
    for(index in fileList) {
        await cloudinary.uploader.upload(fileList[index].path, {upload_preset: "ml_default",}, (error, result)=>{
            url_list.push(result.url)
        });
    }  
    return url_list
}

module.exports = handleUploadMedia