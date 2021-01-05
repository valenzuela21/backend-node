const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor  = require('../models/doctor');

const eraseImage = (path) =>{
    if(fs.existsSync(path)){
        //Erase image after
        fs.unlinkSync(path);
    }
}


const updateImagen = async (type, id, nameArchive) =>{
    let pathOlder = '';

    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log("Not results in doctors");
                return false;
            }

            pathOlder = `./uploads/doctors/${doctor.img}`;

            eraseImage(pathOlder);

            doctor.img = nameArchive;
            await doctor.save();
            return true;

            break;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log("Not results in hospitals");
                return false;
            }

            pathOlder = `./uploads/hospitals/${hospital.img}`;

            eraseImage(pathOlder);

            hospital.img = nameArchive;
            await hospital.save();
            return true;
            break;
        case 'users':
            const user = await User.findById(id);
            if(!user){
                console.log("Not results in users");
                return false;
            }

            pathOlder = `./uploads/users/${user.image}`;

            eraseImage(pathOlder);

            user.image = nameArchive;
            await user.save();
            return true;
            break;
        default:
            console.log("Not exists this url...")
            return true;

    }



}
module.exports = {
    updateImagen
}
