import path from 'path'


export const identityFile = (files, pathName) => {

    return files.map((file, i) => {
        const timestamp = new Date().getTime()
        return {
            newName: `${pathName}/${timestamp}33${i}${path.extname(file.originalFilename)}`,
            filepath: file.filepath
        }
    })
}