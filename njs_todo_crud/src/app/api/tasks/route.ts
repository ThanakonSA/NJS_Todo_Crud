import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGO_URI?.split('/').pop();
        const db = client.db(dbName);
        const tasks = await db.collection('tasks').find({}).toArray();

        return NextResponse.json({
            dbName,
            tasks,
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.error();
    }
}

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGO_URI?.split('/').pop();
        const db = client.db(dbName);
        
        const body = await request.json();
        const result = await db.collection('tasks').insertOne(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error inserting task:", error);
        return NextResponse.error();
    }
}

export async function PUT(request: Request) {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGO_URI?.split('/').pop();
        const db = client.db(dbName);
        
        const body = await request.json();
        const { id, status } = body;

        const result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(id) }, 
            { $set: { status } }
        );

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.error();
    }
}

export async function DELETE(request: Request) {
    try {
        const client = await clientPromise;
        const dbName = process.env.MONGO_URI?.split('/').pop();
        const db = client.db(dbName);
        
        const { id } = await request.json();
        const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) }); 

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.error();
    }
}