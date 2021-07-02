// this example for uploading directly from server,
//unlike the presign, server handle the file in stream.
import formidable from "formidable";
import { uploadFiles } from '../../../utils/helpersForm'

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function upload(req, res) {
    try {
        const form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(200).json({
                    code: 1,
                    info: "gagal parse file",
                });
            }
            // console.log(fields);
            await uploadFiles(
                files.file.path,
                files.file.name,
                files.file.type,
                function (s3Err, data) {
                    if (s3Err) {
                        console.log(s3Err)
                        return res.status(200).json({
                            code: 2,
                            info: 'Upload Fail',
                        });
                    }

                    return res.status(200).json({
                        code: 0,
                        info: 'Berhasil Upload',
                        url: data.Location
                    });
                })
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            code: 3,
            info: "gagal upload file",
        });
    }
}
