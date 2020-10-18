export default function handler(req, res) {
    res.status(200).json({ secret: process.env.secret })
}