function getHello(req,res) {
    res.status(200).send({
        msg: "¡Hello World!"
    });
}

module.exports = {
    getHello
};