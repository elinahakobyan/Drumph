const path = require('path');
const { Lame } = require('node-lame');
const { readdirSync } = require('fs');

module.exports = () => {
    const inputPath = path.join('assets-raw', 'sounds');
    const outputPath = path.join('assets', 'sounds');
    const dirCont = readdirSync(inputPath);
    const encoders = dirCont
        .filter((elm) => {
            return elm.match(/.*\.(mp3|ogg|wav)/gi);
        })
        .map((elm) => path.join(inputPath, elm))
        .map((a) => {
            const e = new Lame({
                output: path.join(outputPath, `${path.basename(a, path.extname(a))}.mp3`),
                bitrate: 32,
                mode: 'm',
            }).setFile(a);
            return e.encode();
        });

    return Promise.all(encoders);
};
