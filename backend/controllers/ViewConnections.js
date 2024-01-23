const User = require("../mongoose/models/UserSchema");

const ViewConnections = async (req, res) => {
    try {
        const _id  = req.params.id;
        const connections = await User.findById(_id );
        if (connections) {
            res.status(200).json({ message: "exist", friendlist: connections.connections});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = ViewConnections;
