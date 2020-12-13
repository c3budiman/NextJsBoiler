import { Models, connectDB } from '../../../../drivers/mongoose/mongoose'

export default async function usersHandler(req, res) {
    if (req.method == "GET") {
        await connectDB()
        return await Models.User.find({}, (err, users) => {
            if (err) {
                console.log(err)
                return res.status(400).json(err)
            } else {
                let response = {
                    code: 0,
                    info: "list all users successfully",
                    data: users
                }
                return res.status(200).json(response)
            }
        })
    }

    if (req.method == "POST") {
        await connectDB()
        let status = 200
        if (!req.body) {
            return res.status(400).json({
                message: "you need a body bro!"
            })
        }
        return await Models.User.create(req.body, (err, user) => {
            if (err) {
                status = 400
                console.log(err)
                return res.status(status).json(err)
            } else {
                let response = {
                    code: 0,
                    info: "create user successfully",
                    data: user
                }
                return res.status(status).json(response)
            }
        })
    }

    if (req.method == "DELETE") {
        await connectDB()
        if (!req.body) {
            return res.status(400).json({
                message: "you need a body bro!"
            })
        }
        return await Models.User.deleteOne({ username: req.body.username }, async (err, user) => {
            if (err) {
                console.log(err)
                res.status(400)
                return res.send({
                    "err": "incorrect username!",
                    'more': err
                })
            } else {
                return res.send({
                    code: 0,
                    deleted: true,
                    data: user
                })
            }
        })
    }
}