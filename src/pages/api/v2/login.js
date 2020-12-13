import { Models, connectDB } from '../../../drivers/mongoose/mongoose'

export default async function loginHandler(req, res) {
    if (req.method == "POST") {
        await connectDB()
        if (!req.body) {
            return res.status(400).json({
                message: "you need a body bro!"
            })
        }
        let iscorrectpass = false

        return await Models.User.findOne({ username: req.body.username }, async (err, user) => {
            if (err) {
                console.log(err)
                res.status(400)
                return res.send({
                    "err": "incorrect username!",
                    'more': err
                })
            } else {
                iscorrectpass = await user.validatePassword(req.body.password);
                if (!iscorrectpass) {
                    res.status(400)
                    return res.send({
                        "err": "incorrect password!"
                    })
                } else {
                    //todo make token save it to cookies in browser
                    
                    return res.send({
                        login: iscorrectpass,
                        data: {
                            "username": user.username,
                            "_id": user._id
                        }
                    })
                }
            }
        }).select("+password")

    } else {
        return res.status(status).json({ "err": "Invalid call method" })
    }
}