const fs = require('fs'),
    colors = require('colors');

const copyPromise = (source, target) => {
    const readStream = fs.createReadStream(source),
        writeStream = fs.createWriteStream(target);
    return new Promise((resolve) => {
        writeStream.on('finish', () => {
            resolve();
        });
        readStream.pipe(writeStream);
    });
};

// copy文件夹下文件
const copy = (fromDir, toDir) => {
    fs.mkdir(toDir, () => {
        fs.readdir(fromDir, (err, files) => {
            Promise.all(
                files.map(f => {
                    return copyPromise(`${fromDir}/${f}`, `${toDir}/${f}`)
                })
            ).then(() => {
                console.log(`create success`.green);
            });
        });
    });
};

module.exports = (name, dir) => {
    copy(`${__dirname}/template`, `${dir}/${name}`);
};
