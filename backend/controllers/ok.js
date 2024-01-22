const ok = async (req, res) => {
    try {
        res.send("test ok");
    } catch (error) {
        console.log(error);
    }
};

module.exports = ok;
