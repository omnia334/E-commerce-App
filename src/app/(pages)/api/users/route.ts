import { NextRequest, NextResponse } from "next/server";

const users = [{
    name:'omnia',
    email:'omnia8@gmail.com'
}]

export async function GET() {

    return NextResponse.json(users)
    
}

export async function POST(req : NextRequest) {

    const body = await req.json()

    Users.push(body)
    return NextResponse.json({
        message:'success',
        users
    })
    
}