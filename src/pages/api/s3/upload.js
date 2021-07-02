// this example for uploading directly from server, 
//unlike the presign, server handle the file in stream.

import aws from 'aws-sdk';
import formidable from 'formidable';
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function upload(req, res) {
    try {
        aws.config.update({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
            region: process.env.S3_REGION,
            signatureVersion: 'v4',
        });
        const s3 = new aws.S3();

        const form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(200).json({
                    code: 1,
                    info: 'gagal parse file',
                });
            }

            let fileStream = fs.createReadStream(files.file.path);

            fileStream.on('error', function (err) {
                console.log('File Error', err);
                return res.status(200).json({
                    code: 2,
                    info: 'gagal stream file',
                });
            });

            const params = {
                Bucket: process.env.S3_BUCKET_NAME, // pass your bucket name
                Key: files.file.name, // file will be saved as testBucket/contacts.csv
                Body: fileStream,
                ContentType: files.file.type
            };

            await s3.upload(params, function (s3Err, data) {
                if (s3Err) {
                    console.log(s3Err)
                    return res.status(200).json({
                        code: 2,
                        info: 'gagal upload file',
                    });
                }

                return res.status(200).json({
                    code: 0,
                    info: 'Berhasil Upload',
                    url: data.Location
                });
            });
        });
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            code: 2,
            info: 'gagal upload file',
        });
    }
}
