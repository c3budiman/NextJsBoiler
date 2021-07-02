import formidable from "formidable";
import { uploadFiles } from '../../../utils/helpersForm'
import { emptyToString, rejectNull } from '../../../utils/helpers'
import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import md5 from 'md5'

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function upload(req, res) {
    try {
        var sql = `INSERT INTO users
            (
                username,
                password,
                role,
                bio,
                images
            )
            VALUES
            (
                ?,
                ?, 
                ?, 
                ?, 
                ?
            )
        `;

        const form = new formidable.IncomingForm();

        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(200).json({
                    code: 1,
                    info: "gagal parse file",
                });
            }
            rejectNull(files.image, 'image', res);

            await uploadFiles(
                files.image.path,
                files.image.name,
                files.image.type,
                async function (s3Err, data) {
                    if (s3Err) {
                        console.log(s3Err)
                        return res.status(200).json({
                            code: 2,
                            info: 'Upload Fail',
                        });
                    }

                    // klo upload berhasil save db :
                    var param = [
                        rejectNull(fields.username, 'username', res),
                        md5(rejectNull(fields.password, 'password', res)),
                        rejectNull(fields.role, 'role', res),
                        emptyToString(fields.bio),
                        emptyToString(data.Location)
                    ]

                    var insert = await mysqlQuery(sql, param)
                    if (insert.code == 0) {
                        return res.status(200).json({
                            code: 0,
                            info: 'Users Created',
                            data: insert,
                            s3: data
                        })

                    } else {
                        return res.status(200).json(insert)
                    }
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
