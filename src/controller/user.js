const { genSaltSync, compareSync, hashSync} = require('bcrypt');
const userModel = require('../models/user');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    userDetail: (req, res) => {
        const idUser = req.params.id_user
        userModel.userDetail(idUser)
            .then((result) => {
                if (!result[0].id) {
                    MiscHelper.response(res, err, 400, 'User Not Found');
                }else {
                    MiscHelper.response(res, result, 200, 'Success')
                }
            })
            .catch((err) => {
                MiscHelper.response(res, err, 400, 'User Not Found');
            });
    },
    userGet: (req, res) => {
        userModel.userGet()
            .then((result) => {
                MiscHelper.response(res, result, 200 );
            })
            .catch(err => {
                MiscHelper.response(res, result, 400, err);
            });
    },
    register: (req, res) => {
        const {email, fullname, password, phone} = req.body
        const data = {
            email,
            fullname,
            password,
            phone,
            status: 1
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        userModel.register(data)
            .then((result) => {
                MiscHelper.response(res, result, 200)
            })
            .catch(err => {
                MiscHelper.response(res, {}, 201, err)
            })
    },
    login: (req, res) => {
        const {email, password} = req.body
        const data = {
            email,
            password
        }
        console.log(data.email)
        userModel.login(data.email)
            .then((result) => {
                const checkPass = compareSync(data.password, result[0].password)
                console.log(checkPass)
                if (checkPass) {
                    MiscHelper.response(res, result, 200, 'Login Successfully!');
                } else {
                    MiscHelper.response(res, null, 400, 'Invalid Password!');
                }
            })
            .catch(err => {
                MiscHelper.response(res, null, 400, 'Invalid Email');
            })
    },
    updateUser: (req, res) => {
        const idUser = req.params.id_user
        const {fullname, email, password, phone} = req.body
        const data = {
            email,
            fullname,
            password,
            phone
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        userModel.updateUser(idUser, data)
            .then((result) => {
                MiscHelper.response(res, result, 200)
            })
            .catch(err => {
                MiscHelper.response(res, result, 400)
            })
    },
    deleteUser: (req, res) => {
        const idUser = req.params.id_user
        userModel.deleteUser(idUser)
            .then((result) => {
                if(result.length <= 0) {
                    MiscHelper.response(res, {}, 400, 'User Not Found')
                } else {
                    userModel.deleteUser(idUser)
                    .then((result) => {
                        MiscHelper.response(res, result, 200, 'Deleteing Success!')
                    })
                }   
            })
            .catch(err => {
                MiscHelper.response(res, result, 400, 'User Not Found');
            })
    },
}