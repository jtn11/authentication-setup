import jwt from "jsonwebtoken" ; 

const JWT_Secret = "superSecretKey" 

export function signToken(payload : object) {
    return jwt.sign(payload , JWT_Secret , {expiresIn : "24h"})
}
export function verifyToken(token : string){
    return jwt.verify(token , JWT_Secret)
}
