const path = require("path")
const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    // get image extension
    let extName = path.extname(fileObject.name)

    // get image's name (without extension)
    let baseName = path.basename(fileObject.name, extName)

    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`
    try {
        await fileObject.mv(finalPath)
        return {
            status: "success",
            path: finalName,
            // error: JSON.stringify(err)
        }
    }
    catch (err) {
        if (err) {
            console.log(err)
            return {
                status: "failed",
                path: null,
                error: JSON.stringify(err)
            }
            // return res.status(500).send(err)
        }
    }
}

const uploadMultipleFiles = async (fileArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        let resultArr = [];
        let countSuccess = 0
        for (let i = 0; i < fileArr.length; i++) {
            let extName = path.extname(fileArr[i].name)

            // get image's name (without extension)
            let baseName = path.basename(fileArr[i].name, extName)

            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`
            try {
                await fileArr[i].mv(finalPath)
                resultArr.push({
                    status: "success",
                    path: uploadPath,
                    fileName: finalName,
                    error: null,
                })
                countSuccess++
            }
            catch (err) {
                resultArr.push({
                    status: "failed",
                    path: null,
                    fileName: finalName,
                    error: JSON.stringify(err),
                })
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = { uploadMultipleFiles, uploadSingleFile }