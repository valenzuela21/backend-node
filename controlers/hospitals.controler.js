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

const updateHospitals = async (req, res = response) => {
    const id = req.params.id;
    try {
        const hospitals = await Hospital.findById(id);
        const uid = req.uid;

        if (!hospitals) {
            return res.status(404).json({
                ok: false,
                msg: 'I can\'t find the hospital...'
            })
        }

        //Data Change Doctor
        const changeHospital = {
            ...req.body,
            user: uid
        }

        //Update data Doctor Mongo DB
        const hospitalUpdate = await Hospital.findByIdAndUpdate(id, changeHospital, {new: true})

        res.status(200).json({
            ok: true,
            msg: 'Hospital updated successfully...',
            hospitalUpdate
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: true,
            msg: 'Error: This id or identifier does not exist...'
        })
    }


}

const deleteHospitals = async (req, res = response) => {
    const id = req.params.id;
    try {
        const hospitals = await Hospital.findById(id);

        if (!hospitals) {
            return res.status(404).json({
                ok: false,
                msg: 'I can\'t find the hospital...'
            })
        }


        await Hospital.findByIdAndDelete(id)

        res.status(200).json({
            ok: true,
            msg: 'Hospital delete successfully...',
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: true,
            msg: 'Error: This id or identifier does not exist...'
        })
    }
}


module.exports = {
    getHospitals,
    postHospitals,
    updateHospitals,
    deleteHospitals
}
