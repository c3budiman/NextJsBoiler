import formidable from "formidable";
import { uploadFiles } from '../../../utils/helpersForm'
import { emptyToString, rejectNull, getSessionFromHeader } from '../../../utils/helpers'
import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function upload(req, res) {
    try {
        var sql = `Update users set images=? where id =?`;
        let sessionUser = await getSessionFromHeader(req);
        if (sessionUser.code == 0) {
            const form = new formidable.IncomingForm();
            form.keepExtensions = true;
            // upload dlu foto baru
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(200).json({
                        code: 1,
                        info: "gagal parse file",
                    });
                }
                console.log(fields);
                // reject klo dia ga punya image
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
                            emptyToString(data.Location),
                            rejectNull(sessionUser.data?.id, 'Users Session', res),
                        ]

                        var update = await mysqlQuery(sql, param)
                        if (update.code == 0) {
                            return res.status(200).json({
                                code: 0,
                                info: 'Users Updated',
                                data: update,
                                s3: data
                            })
                        } else {
                            return res.status(200).json(update)
                        }
                    })
            });
        } else {
            return res.status(200).json({
                code: sessionUser.code,
                info: sessionUser.info,
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            code: 3,
            info: "gagal upload file",
        });
    }
}
