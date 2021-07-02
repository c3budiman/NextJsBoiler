// okay noobs, presign mean we create url, for the aws to upload our resources
// so we dont actually upload it here.
import aws from 'aws-sdk';

export default async function handler(req, res) {
    aws.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
        region: process.env.S3_REGION,
        signatureVersion: 'v4',
    });

    const s3 = new aws.S3();
    const post = await s3.createPresignedPost({
        Bucket: process.env.S3_BUCKET_NAME,
        Fields: {
            key: req.query.file,
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    });

    res.status(200).json(post);
}
