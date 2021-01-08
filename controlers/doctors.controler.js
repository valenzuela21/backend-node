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

const updateDoctors = async (req, res = response) =>{
    const id = req.params.id;

    try{
        const doctors = await Doctor.findById(id);
        const uid = req.uid;

        if(!doctors){
            return res.status(404).json({
                ok: true,
                msg: "Error: The doctor data does not exist",
            })
        }

        //Data Change Doctor
        const changeDoctor = {
            ...req.body,
            user: uid
        }

        //Update data Doctor Mongo DB
        const doctorUpdate = await  Doctor.findByIdAndUpdate(id, changeDoctor, {new : true})

        res.status(200).json({
            ok: true,
            msg: 'Hospital updated successfully...',
            doctorUpdate
        });

    }catch (e) {
        console.log(e);
        res.status(401).json({
            ok: false,
            msg: 'Error: Failed to update the doctor...'
        })
    }


}

const deleteDoctors = async (req, res = response) => {
    const id = req.params.id
    try{
    const doctors = await Doctor.findById(id);
        if(!doctors){
            return res.status(404).json({
                ok: true,
                msg: "Error: The doctor data does not exist",
            })
        }

        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: "Doctor has been removed..."
        })

    }catch (e) {
        console.log(e);
        res.status(401).json({
            ok: false,
            msg: 'Error: Failed to remove the doctor...'
        })
    }

}



module.exports ={
    getDoctors,
    postDoctors,
    updateDoctors,
    deleteDoctors
}
