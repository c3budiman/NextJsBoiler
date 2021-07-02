const fs = require('fs');
import aws from 'aws-sdk';

export async function uploadFiles(filepath, filename, filetype, callback) {
    let fileStream = fs.createReadStream(filepath);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
        return {
            code: 2,
            info: 'gagal stream file',
        }
    });

    aws.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION,
        signatureVersion: 'v4',
    });
    const s3 = new aws.S3();

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
        Body: fileStream,
        ContentType: filetype
    };

    await s3.upload(params, callback);
}