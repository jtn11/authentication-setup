import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if(!token){
        return NextResponse.json({user : null} , {status: 401})
    }
}