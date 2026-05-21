const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne(
            { email: email },
            '-__v -createdAt -updatedAt'
        );

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    return res.status(500).json(err);
                }

                if (response) {
                    delete user._doc.password;
                    
                    req.session.user = {
                        id: user._id,
                        name: user.name,
                        firstname: user.firstname,
                        email: user.email
                    };

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign(
                        { user: user },
                        process.env.SECRET_KEY,
                        { expiresIn: expireIn }
                    );

                    res.header('Authorization', 'Bearer ' + token);
                    if (req.headers['content-type'] === 'application/json') {
                        return res.status(200).json ({
                            message: 'authenticate_succeed',
                            token: token
                        });
                    }
                    return res.redirect('/dashboard');
                }

                return res.status(403).json('wrong_credentials');
            });

        } else {
            return res.status(404).json('user_not_found');
        }

    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getByEmail = async (req, res, next) => {
    const id = req.params.email;

    try{
        let user = await User.findOne({ email: email });

        if(user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.add = async (req, res) => {

    try {

        const temp = {
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password
        };

        await User.create(temp);

        return res.status(201).redirect('/users');

    } catch (error) {

        console.log("ERROR ADD USER :", error);

        if (error.code === 11000) {
            return res.status(409).json('email_already_exists');
        }

        return res.status(501).json(error);

    }
};

exports.update = async(req, res, next) => {

    const temp = ({
        name     : req.body.name,
        firstname: req.body.firstname,
        password : req.body.password
    });

    try {

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {

            Object.keys(temp).forEach((key) => {

                if (!!temp[key]) {
                    user[key] = temp[key];
                }

            });

            await user.save();

            return res.redirect('/users');

        }

        return res.status(404).json('user_not_found');

    } catch (error) {

        return res.status(501).json(error);

    }

};

exports.delete = async(req, res, next) => {
    const email = req.params.email;
    
    try {
        const result = await User.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.status(404).json('user_not_found');
        }

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};
