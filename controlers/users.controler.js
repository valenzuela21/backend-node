const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt')

const getUsers = async (req, res) => {
    const page = Number(req.query.of) || 0;

    /*    const users = await User.find({}, 'name email role google')
                                .skip(page)
                                .limit(5);

        const total = await User.count();*/

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google image')
            .skip(page)
            .limit(10),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
        //uid: req.uid
    })
}

const postUsers = async (req, res = response) => {
    const {password, email} = req.body;

    try {
        const existEmail = await User.findOne({email});

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: "¡He email is registered!"
            });
        }

        const user = new User(req.body);

        //Encrypt Password

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        //Save New User
        await user.save();

        //Generate Token User
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Error: inexpert... check log"
        });
    }


}

const putUsers = async (req, res = response) => {

    //Validate Token y check user correctly

    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Error: ¡There is no user in the database!"
            });
        }

        const {name, password, email, ...inputs} = req.body;

        if (userDB.email != email) {
            const existsEmail = await User.findOne({email});
            if (existsEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Error: ¡There is already a user with this email!"
                });
            }
        }

        inputs.name = name;
        if (!userDB.google) {
            inputs.email = email;
        } else if (userDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: "Error: ¡Google users cannot change their mail¡"
            });
        }

        //Update User in DB
        const userUpdate = await User.findByIdAndUpdate(uid, inputs, {new: true});

        res.status(200).json({
            ok: true,
            userUpdate
        })

    } catch (e) {
        console.log(`Error: Update user db: ${e}`);
        res.status(500).json({
            ok: true,
            msg: "Error: Put Users DB"
        })
    }

}


const deleteUsers = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userID = await User.findById(uid);

        if (!userID) {
            return res.json({
                ok: true,
                msg: 'There is no user with this id'
            })
        }
        await User.findByIdAndDelete(uid);

        return res.status(200).json({
            ok: true,
            msg: "¡User successfully removed!"
        });

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            ok: true,
            msg: 'Error in the administration...'
        });

    }


}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}
