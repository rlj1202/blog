import fs from 'fs'
import got from 'got'
import stream from 'stream'
import { promisify } from 'util'

export async function downloadImage(url: string | URL, path: fs.PathLike) {
    const downloadStream = got.stream(url)
    const fileWriterStream = fs.createWriteStream(path)

    downloadStream
        .on('downloadProgress', ({ transferred, total, percent }) => {
            console.log(`${transferred}/${total} ${percent * 100}`)
        })

    return (promisify(stream.pipeline))(downloadStream, fileWriterStream)
}
