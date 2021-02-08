// to make an admin account you just need to register a new user and assign the user_name to "admin"
const bcrypt = require('bcrypt');
const db = require("../utils/dbService")

class UserRepo {

    async ifExists(userName) {
        userName = userName.trim().toLowerCase()
        const dbResponse = await db.executeQuery("SELECT * FROM users WHERE user_name = ?", [userName])
        return !dbResponse || dbResponse === 0 ? null : dbResponse[0];
    }

    async addUser(data) {
        const { first_name, last_name, user_name, password } = data;
        const check = await this.ifExists(user_name);
        if (check) {
            throw { errors: ["User already exists"] };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserToAdd = {
            first_name,
            last_name,
            user_name,
            password: hashedPassword,
            role: user_name === "admin" ? "admin" : "customer",//for making an admin and just 1 ...
        };
        const dbInsertionResult = await db.executeQuery("INSERT INTO users SET ?", newUserToAdd);
        return { id: dbInsertionResult.insertId, ...newUserToAdd }
    }

}

const REPOSITORY = new UserRepo()
module.exports = REPOSITORY;