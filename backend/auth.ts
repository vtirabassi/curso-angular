import {Request, Response} from 'express'
import {User, users} from './users'

import * as jwt from 'jsonwebtoken'
import {apiConfig} from './app-config'


export const autenticacaoLogin = (req: Request, resp: Response) => {
    const user : User = req.body
    if(isValid(user)){
        const dbUser = users.filter(u => u.email === user.email)[0]

        const accessToken = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)

        resp.status(200).json({name: dbUser.name, email: dbUser.email, accessToken: accessToken})
    }else{
        resp.status(403).json({message: "Usuario invalido!"})
    }
}

function isValid(user: User): boolean {
    user.email
    const dbUser = users.filter(u => u.email === user.email)[0]
    return dbUser !== undefined && dbUser.existe(user)
}