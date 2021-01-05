const {response} = require('express')
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find()
                                    .populate('user', 'name email img');
    res.json({
        ok: true,
        hospitals
    })
}

const postHospitals = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.status(200).json({
            ok: true,
            msg: hospitalDB
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error: talk to the administrator...'
        })
    }

}

const updateHospitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Working controller Update hospitals'
    })
}

const deleteHospitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Working controller Delete hospitals'
    })
}


module.exports = {
    getHospitals,
    postHospitals,
    updateHospitals,
    deleteHospitals
}
