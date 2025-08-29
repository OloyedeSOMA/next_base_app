import { NextResponse } from "next/server";
import { adminAuth } from "@/app/utils/firebase/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(req){
    try{
        // console.log("session api hit")
        const {idToken} = await req.json();
        // console.log("Received ID Token:", idToken);
        const decoded = await adminAuth.verifyIdToken(idToken);
        // console.log("decoded:", decoded);

        // storing user id in a cookie
        (await cookies()).set("uid", decoded.uid,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // valid for a day
        });

        return NextResponse.json({success: true});
    }catch(err){
        console.error("Token verification failed:", err);
        return NextResponse.json({ error: "invalid token", details:String(err) }, { status: 401 });
    }
}