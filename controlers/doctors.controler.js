const {response} = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find()
                                .populate('user', 'name')
                                .populate(      'hospital', 'name');
    res.json({
        ok: true,
        doctors
    })
}

const postDoctors = async (req, res = response) => {
    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });

    try{

        const doctorDB = await doctor.save();

        res.status(200).json({
            ok: true,
            msg: doctorDB
        })

    }catch (e) {
        console.log(e);
        res.status(500).json({
            ok: true,
            msg: 'Error: talk to the administrator...'
        })
    }


}

const updateDoctors = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'Working controller Update doctors'
    })
}

const deleteDoctors = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Working controller Delete doctors'
    })
}



module.exports ={
    getDoctors,
    postDoctors,
    updateDoctors,
    deleteDoctors
}
