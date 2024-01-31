const moment = require("moment-timezone");

const ok = (req, res) => {
    try {
        const utcDate = "2024-01-31T11:46:22.410Z";
        const istDate = moment.utc(utcDate).tz("Asia/Kolkata").format();

        res.status(200).json({ istDate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = ok;
   