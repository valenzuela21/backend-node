const {response} = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital')

const getSearch = async (req, res = response) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({
            name: regex
        }),
        Doctor.find({
            name: regex
        }),
        Hospital.find({
            name: regex
        })
    ])

    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    })
}

const getDocumentColeccion = async (req, res = response) => {

    const search = req.params.search;
    const table = req.params.table;
    const regex = new RegExp(search, 'i');

    let data = [];

    switch (table) {
        case 'doctors':
            data = await Doctor.find({
                name: regex,
            })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case  'hospital':
            data = await Hospital.find({
                name: regex,
            })
                .populate('user', 'name img');
            break;
        case  'users':
            data = await User.find({
                name: regex
            });
            break;
        default:
            res.status(400).json({
                ok: false,
                msg: 'The table does not exit...'
            })

    }

    res.status(200).json({
        ok: false,
        results: data
    })


}


module.exports = {getSearch, getDocumentColeccion}
