const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const userRepo = require("./UsersRepo")

router.post('/login', async (req, res) => {

    const { user_name, password } = req.body

    const checkIfExists = await userRepo.ifExists(user_name);
    if (!checkIfExists) {
        res.status(409).send({ errors: "Incorrect username/password" });
    } else {
        await bcrypt.compare(password, checkIfExists.password, (err, match) => {
            if (err) {
                res.status(500).send({ err: err.message })
            } else {
                if (match) {
                    const sessionUser = remove(checkIfExists, ["password"])
                    req.session.user = sessionUser
                    res.cookie("userId", checkIfExists.id)
                    res.send(sessionUser);
                } else {
                    res.status(408).send({ errors: "bad username/password" })
                }
            }
        })
    }
})

router.post('/logout', (req, res) => {
    console.log(req.session)
    if (req.session && req.session.user) {
        req.session.user = null;
        res.send({ message: "Logged out!" })
    } else {
        res.status(401).send({ errors: ['User is not yet authorized'] })
    }
});


router.post("/register", async (req, res) => {
    const user = req.body
    try {
        const checkIfRegistered = await userRepo.addUser(user)
        res.status(200).send(remove(checkIfRegistered, ["password"]))
    } catch (err) {
        res.status(409).send(err)

    }

})

const remove = (obj, properties) => {
    const result = { ...obj };
    for (const property of properties) {
        delete result[property];
    }
    return result;
}

module.exports = router;