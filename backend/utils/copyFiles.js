import fs from 'fs'


export const copyFiles = (files) => {

    const promises = files.map((file, i) => {

        return new Promise((resolve, reject) => {
            fs.copyFile(file.filepath, `public/${file.newName}`, (err) =>{
                if (err) reject(err)
                else resolve(file)
            })
        })
    })
    return Promise.all(promises)
}