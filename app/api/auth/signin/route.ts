import { signToken } from "@/app/lib/auth";
import { users } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req : Request){
    const {email , password} = await req.json();

    const user = users.find((user)=> user.email === email);
    if(!user){
        return NextResponse.json({message : "User does not exist"}) ;
    }

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
        return NextResponse.json({message : "Invalid Credential"}, {status : 401});
    }

    const token = signToken({id : user.id , email : user.email});
    const response = NextResponse.json({message : "Login Successful"});
    response.cookies.set("token", token , {
        httpOnly : true , 
        path : "/"
    }) ;
    return response ; 
}