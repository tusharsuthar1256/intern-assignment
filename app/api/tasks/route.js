import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/DBConnect";
import Task from "@/model/Task.model";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json([], { status: 401 });

    const user = verifyToken(token);
    await connectDB();

    const tasks = await Task.find({ userId: user.id }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    const body = await req.json();

    await connectDB();

    const task = await Task.create({
      ...body,
      userId: user.id,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
