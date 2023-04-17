const cloudinary = require('cloudinary').v2;

const handleUploadMedia = async (fileList, res) => {
    const url_list= []
    try {
        for(index in fileList) {
            await cloudinary.uploader.upload(fileList[index].path, {upload_preset: "ml_default",}, (error, result)=>{
                if(error) {
                    res.json({
                        "code": "invalid_token",
                        "message": error
                    })        
                }else {
                    url_list.push(result.url)
                }
            });
        }  
    } catch (error) {
        res.status(500).json({
            "code": "failed",
            "message": error,
            "data": null
        })
    }

    return url_list
}

module.exports = handleUploadMedia