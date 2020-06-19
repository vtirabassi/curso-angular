import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { decode } from 'punycode'

import {apiConfig} from './app-config'

export const autorizacaoLogin = (req: Request, resp: Response, next) => {

    const token = extractToken(req)
    if(!token){
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        resp.status(401).json({message: 'Você precisa se autenticar.'})
    }else{
        jwt.verify(token, apiConfig.secret, (error, decoded) => {
            if(decoded){
                next()
            }else{
                resp.status(403).json({message: 'Você não possui acesso.'})
            }
        })
    }
}

function extractToken(req: Request) {
    let token = undefined
    let authorization: string = req.headers.authorization

    if(req.headers && authorization){

        const parts: string[] = authorization.split(' ')

        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }

    return token
}