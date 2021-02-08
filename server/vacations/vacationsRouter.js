const express = require("express");
const router = express.Router();
const vacationRepo = require("./VacationsRepo")
const wsHandler = require("../utils/webSockets")
const multer = require("multer");
const uuid = require('uuid').v4;
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: './client/src/images',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        let newFileName = uuid();
        if (ext && ext.length > 0) {
            newFileName = newFileName + ext;
        }
        cb(null, newFileName);
    }
})

const upload = multer(
    {
        storage: multerStorage,
        limits: {
            fileSize: 1024 * 1024 * 50, // 50 mb
        }
    });


router.post("/add-vacation", upload.single("imageFile"), async (req, res) => {
    const { description, destination, from, to, price } = req.body
    const newVacation = {
        description,
        destination,
        from,
        to,
        price,
        imageFileName: req.file.filename
    }
    try {
        const responseFromDB = await vacationRepo.addVacation(newVacation)
        notifyUser("add-vacation")
        res.status(200).send(responseFromDB)
    } catch (errors) {
        res.status(401).send(errors)
    }

})


router.post("/delete", async (req, res) => {
    const id = req.body
    const responseFromDB = await vacationRepo.deleteVacation(id)
    if (responseFromDB) {
        const allVacations = await vacationRepo.fetchAll()
        notifyUser("delete-vacation")
        res.status(200).send(allVacations)
    } else {
        console.log("error happened while deleting vacation!")
    }
})

router.get("/:vacationId", async (req, res) => {
    const vacationId = req.params.vacationId
    const responseFromDB = await vacationRepo.findById(vacationId)
    if (responseFromDB) {
        res.status(200).send(responseFromDB)
    }
})



router.post("/update-vacation", upload.single("imageFile"), async (req, res) => {
    const { id, description, destination, from, to, price } = req.body
    const vacationToUpdate = {
        id,
        description,
        destination,
        from,
        to,
        price,
        imageFileName: req.file.filename
    }

    const responseFromDB = await vacationRepo.updateVacation(vacationToUpdate)
    if (responseFromDB && responseFromDB.length > 0) {
        notifyUser("update-vacation")
        res.status(200).send(responseFromDB)
    } else {
        res.status(401).send(responseFromDB.errors)
    }

})

router.post("/follow-vacation", async (req, res) => {
    const { userId, vacationId } = req.body
    try {
        const responseFromDB = await vacationRepo.followVacation({ userId, vacationId })
        notifyUser("chart-update")
        notifyUser("update-vacation")
        res.status(200).send(responseFromDB)
    } catch (errors) {
        res.status(400).send(errors)
    }
})

router.post("/unfollow-vacation", async (req, res) => {
    const { userId, vacationId } = req.body
    try {
        const responseFromDB = await vacationRepo.unFollowVacation({ userId, vacationId })
        if (!responseFromDB) {
            notifyUser("chart-update")
            notifyUser("update-vacation")
            res.send([])
        } else {
            notifyUser("chart-update")
            notifyUser("update-vacation")
            res.status(200).send(responseFromDB)
        }

    } catch (errors) {
        res.status(400).send(errors)
    }
})

router.get("/followed-vacations/:userId", async (req, res) => {
    var serverResponse = []
    const userId = req.params.userId
    try {
        const responseFromDB = await vacationRepo.getFollowedVacations(userId)
        if (!responseFromDB) {
            res.send([])
        } else {
            serverResponse = await newObject(responseFromDB)
            res.status(200).send(serverResponse)
        }
    } catch (errors) {
        res.status(400).send({ errors })
    }
})

router.get("/", async (req, res) => {
    var serverResponse = []
    try {
        const responseFromDB = await vacationRepo.fetchAll();
        serverResponse = await newObject(responseFromDB)
        res.status(200).send(serverResponse)
    } catch (errors) {
        res.status(404).send({ errors })
    }
})

router.get("/number-of-followers/chart", async (req, res) => {
    const responseFromDB = await vacationRepo.getNumbersForChart()
    if (!responseFromDB) {
        res.status(200).send([])
    } else {
        res.status(200).send(responseFromDB)
    }
})

const newObject = async (vacations) => {
    let serverResponse = []
    //adding the number of the followers for each vacation and sending the new object
    await Promise.all(vacations.map(async vacation => {
        let numberOfFollowers = await vacationRepo.getNumberOfFollowers(vacation.id)
        serverResponse.push({ ...vacation, numberOfFollowers })
    }))
    return serverResponse
}

const notifyUser = (emitType) => {
    try {
        wsHandler.io().emit(emitType)
    } catch (errors) {
        console.log(errors)
    }
}


module.exports = router;