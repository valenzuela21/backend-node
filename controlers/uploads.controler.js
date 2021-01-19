const path = require('path');
const fs = require('fs');
const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require('../helpers/updateImage');

const fileUpload = async (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validate Type
    const typesValidate = ['hospitals', 'doctors', 'users'];

    if (!typesValidate.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: "Type file error params..."
        })
    }

    // Validate exists archive
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: true,
            msg: "No found file..."
        })
    }

    // Process he image
    const file = req.files.image;

    const nameSplit =  file.name.split('.');
    const extensionArchive = nameSplit[nameSplit.length - 1];

    //Validate extension
    const extensionType = ['jpg', 'jpeg', 'gif', 'png'];
    if(!extensionType.includes(extensionArchive)){
        return res.status(400).json({
            ok: true,
            msg: "Do not extension validate..."
        })
    }


    //Generate name archive
    const nameArchive = `${uuidv4()}.${extensionArchive}`;

    //Create Path file save
    const path = `./uploads/${type}/${nameArchive}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: true,
                msg: err
            })
        }
        res.status(200).json({
            ok: true,
            msg: "Archive upload success fully",
            nameArchive
        })
    });

    //Update Table DB
    updateImagen(type, id, nameArchive);

}

const returnImage  = (req, res = response) =>{
    const type = req.params.type;
    const photo = req.params.photo;
    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathNotFound = path.join(__dirname, `../uploads/image-nofound.png`);
        res.sendFile(pathNotFound);
    }
}

module.exports = {
    fileUpload,
    returnImage
}
