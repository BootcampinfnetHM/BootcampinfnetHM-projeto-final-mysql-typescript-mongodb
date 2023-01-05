import { User } from "../models/user.entity";
import { Op }from 'sequelize'

const bcrypt = require('bcryptjs')

class UserController {
    async login(userEmail: string, password: any){
        let user =  await User.findOne({
            where: {
              [Op.or]: [
                {username: userEmail},
                {email: userEmail}
              ]
            }
          })
          if(user && user.active) {
            const verifyPass =  bcrypt.compareSync(password, user.password)
            if(verifyPass) return user
          }
          return null
    }

    async register(email: string, username: string, name: string, password: string){

      let token = bcrypt.hash(`${username}_${name}`, 10)

        let user =  await User.create({ 
          email,
          username,
          name,
          password,
          token,
          active: false,
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
          })

          return null
    }
}

export default UserController