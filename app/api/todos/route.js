import { adminDb } from "@/app/utils/firebase/firebaseAdmin";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try{
        const uid = cookies().get('uid')?.value;
        console.log('Server UID from cookie:', uid);
        if(!uid) return NextResponse.json("Unauthorised", {status: 401}); console.log("unauthorized");

        const snapshot = await adminDb.collection("users").doc(uid).collection("todos").get();
        console.log(snapshot)
        const todos = snapshot.docs.map((doc)=> ({id: doc.id, ...doc.data()}))
        console.log(todos);

        return NextResponse.json({todos});
    }catch(err){
        return NextResponse.json({Error: "Error fetching todos", status: 500})
    }
}

export async function POST(req) {
    try{
        const uid = cookies().get('uid')?.value;
        console.log(uid);
        if(!uid) return NextResponse.json({Unauthorized:true}, {status: 401});
        const {title} = await req.json();
        console.log(title);

        const todoRef = adminDb.collection("users").doc(uid).collection("todos").doc();

        await todoRef.set({
            title,
            completed: false,
            createdAt: new Date().toISOString()
        })
        console.log(todoRef)
        return NextResponse.json({id:todoRef.id, title})
    }catch (err) {
        console.error('Error creating todo:', err.message, err.stack);
        return NextResponse.json({ error: 'Error creating todo', details: err.message }, { status: 500 });
  }
}