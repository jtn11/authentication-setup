import { users } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req : Request) {

    const {name , email , password} = await req.json();
    
    const userExists = users.find((user)=> user.email === email);
    if(userExists){
        return NextResponse.json({message : "user already exist"} ,{status : 400})
    }
    const hashpassword = await bcrypt.hash(password , 10);
    users.push({
        id : users.length + 1 ,
        name , 
        email , 
        password : hashpassword
    }) ;

    return NextResponse.json({message : "user created successfully"}); 
}