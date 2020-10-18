module.exports = (app) => {
    app.get(`/backend/home`, async (req, res) => {
        return res.status(200).send({
            code: 0,
            info: 'sukses hit',
            data: {
                info: 'sukses hit'
            }
        })
    });
}
