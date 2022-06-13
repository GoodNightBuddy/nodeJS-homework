const { validate } = require('uuid');
const { user } = require('../models/user');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    try {

        if (Object.keys(req.body).length !== Object.keys(user).length - 1) { //id field
            throw new Error('Invalid fields amount')
        }
        const dataKeys = Object.keys(req.body)
        const templateKeys = Object.keys(user)

        for (let i = 0; i < dataKeys.length; i++) {
            if (!templateKeys.includes(dataKeys[i])) {
                throw new Error(`Invalid field ${dataKeys[i]}`)
            }
            if (!req.body[dataKeys[i]]) {
                throw new Error(`Empty field - ${dataKeys[i]}`)
            }
        }
        validateData(req.body, user)
        const data = { ...req.body }
        res.data = data
    } catch (err) {
        res.err = err
    } finally {
        next()
    }

}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    try {
        if (!Object.keys(req.body).length) { //id field
            throw new Error('No fields to update')
        }

        const dataKeys = Object.keys(req.body)
        const templateKeys = Object.keys(user)

        for (let i = 0; i < dataKeys.length; i++) {
            if (!templateKeys.includes(dataKeys[i])) {
                throw new Error('Excess field')
            }
            if (!req.body[dataKeys[i]]) {
                throw new Error(`Empty field - ${dataKeys[i]}`)
            }
        }

        res.data = { ...req.body }
    } catch (err) {
        res.err = err
    } finally {
        next()
    }

    //updateUser
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;


function validateData(data) {

    if (data.email) {
        validateEmail(data.email)
    }
    if (data.phoneNumber) {
        validatePhoneNumber(data.phoneNumber)
    }
    if (data.firstName) {
        validateName(data.firstName)
    }
    if (data.lastName) {
        validateName(data.lastName)
    }
    if (data.password) {
        validatePassword(data.password)
    }
}

const validateEmail = email => {

    if (email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)) {
        if (!email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            throw new Error('Invalid mail')
        }

    } else {
        throw new Error('Only gmail')
    }
}

const validatePhoneNumber = number => {
    if (!number.match(/^\+?3?8?(0\d{9})$/)) {
        throw new Error('Invalid phone number')
    }
}

const validateName = name => {
    if (!name.match(/^[a-zA-Z]+$/)) {
        throw new Error('Invalid first/last name')
    }
}

const validatePassword = password => {
    if (password.length < 3) {
        throw new Error('Min 3 symbols in password')
    }
}