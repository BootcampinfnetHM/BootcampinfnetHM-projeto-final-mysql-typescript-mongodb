import { User } from "../models/user.entity";
import { Op }from 'sequelize'

const bcrypt = require('bcryptjs')

class UserController {
    async login(userEmail: string, password: string){
        let user =  await User.findOne({
            where: {
              [Op.or]: [
                {username: userEmail},
                {email: userEmail}
              ]
            }
          })

          if(user) {

            const verifyPass =  bcrypt.compareSync(password, user.password)
            if(verifyPass) return user
          }
          return null
    }
}

export default UserController