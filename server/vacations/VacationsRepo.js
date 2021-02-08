const db = require("../utils/dbService")

class VacationsRepo {

    async addVacation(vacation) {
        const dbResponse = await db.executeQuery("INSERT INTO vacations_plans SET ?", vacation)
        return { id: dbResponse.insertId, ...vacation }
    }

    async fetchAll() {
        const dbResponse = await db.executeQuery("SELECT * FROM vacations_plans")
        return dbResponse
    }

    async getFollowedVacations(follower_id) {
        const vacations = await db.executeQuery
            ("SELECT * FROM vacations_plans WHERE id IN (SELECT vacation_followed_id FROM followed_vacations WHERE follower_id = ? )", follower_id)
        return (vacations.length === 0) ? null : vacations


    }

    async deleteVacation(id) {
        const idForDeleting = id.id
        const deleteFk = await
            db.executeQuery("DELETE FROM followed_vacations WHERE vacation_followed_id =?", idForDeleting)
        const dbResponse = await
            db.executeQuery("DELETE FROM vacations_plans WHERE id = ?", idForDeleting);
        return dbResponse
    }

    async findById(vacationId) {
        const dbResponse = await db.executeQuery("SELECT * FROM vacations_plans WHERE id = ? ", vacationId)
        return (dbResponse.length === 0) ? null : dbResponse[0]
    }

    async followVacation(data) {
        const follower_id = data.userId
        const vacation_followed_id = data.vacationId
        const new_followed_vacation = { follower_id, vacation_followed_id }
        const dbResponse = await
            db.executeQuery("INSERT INTO followed_vacations SET ?", new_followed_vacation)
        const vacationsFollowed = await this.getFollowedVacations(follower_id);
        return (vacationsFollowed.length === 0) ? null : vacationsFollowed
    }

    async unFollowVacation(data) {
        const follower_id = data.userId
        const vacation_followed_id = data.vacationId
        const dbResponse = await db.executeQuery
            ("DELETE FROM followed_vacations WHERE (follower_id = ? AND vacation_followed_id = ?)", [follower_id, vacation_followed_id])
        const vacationsFollowed = await this.getFollowedVacations(follower_id)
        return vacationsFollowed

    }

    async getNumbersForChart() {
        const dbResponse =
            await db.executeQuery
                ("SELECT destination, count(*) AS numberOfFollowers FROM vacations_plans,followed_vacations WHERE vacations_plans.id = vacation_followed_id GROUP BY destination")
        return dbResponse.length === 0 ? null : dbResponse
    }

    async updateVacation(vacationToUpdate) {

        const vacationId = vacationToUpdate.id
        const dbResponse = await db.executeQuery("UPDATE vacations_plans SET ? WHERE id = ?", [vacationToUpdate, vacationId])
        const allVacations = await this.fetchAll()
        if (dbResponse.warningCount == 0) {
            return allVacations
        } else {
            return [{ errors: dbResponse.message }]
        }
    }

    async getNumberOfFollowers(vacationId) {
        const dbResponse = await db.executeQuery("SELECT count(*) as counter FROM followed_vacations WHERE vacation_followed_id =?", vacationId)
        if (dbResponse)
            return dbResponse[0].counter
        else
            return { errors: ["somthing wenty wrong with Database"] }
    }
}

const REPOSITORY = new VacationsRepo()
module.exports = REPOSITORY;