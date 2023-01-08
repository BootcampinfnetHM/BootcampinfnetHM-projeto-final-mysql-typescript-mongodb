import { User } from "../models/user.entity";
import { Op }from 'sequelize'
import Mail from "../util/Email";

const bcrypt = require('bcryptjs')
require('dotenv').config()

class UserController {

  mail: any

  constructor() {
    let root_dir = __dirname
    root_dir = root_dir.replace("\controllers", "").replace("/controllers", "")
    this.mail = new Mail(root_dir)
  }

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

      let tokenHash = await bcrypt.hash(`${username}${name}`, 10)
      let pass = await bcrypt.hashSync(password, 10)


      // TODO: Mudar token para PIN
        let user =  await User.create({ 
          email,
          username,
          name,
          password: pass,
          token: tokenHash,
          active: false,
          role_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
          })

          this.mail.sendEmail(`${email}`, 'Complete seu registro', 'token-email', {
            email,
            name,
            token: tokenHash,
            url: 'http://localhost:3002'
          })

          return true
    }


    emailConfirmation = async (token: any) => {
      let user =  await User.findOne({
        where: {
            token
        }
      })
      if(user && user.id !== null) {
        User.update({
          active: true
        }, {
          where: {
            id: user.id
          }
      })
        return true
      }

      return false 
    }
 
}

export default UserController