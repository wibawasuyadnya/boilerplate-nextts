// app/api/avatar/route.ts
import { NextResponse } from "next/server";
import { getServerActionSession } from "@/lib/iron-config/session";

const defaultProfile = {
    username: null,
    profilePicture: null,
};

// GET: Return profile data.
export async function GET(request: Request) {
    const session = await getServerActionSession();
    if (!session.isLoggedIn || !session.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (token !== session.user.access_token) {
        return NextResponse.json({ error: "Access token does not match session" }, { status: 403 });
    }

    const profileData = {
        username: defaultProfile.username,
        profilePicture: defaultProfile.profilePicture,
    };
    return NextResponse.json({ data: profileData });
}

// POST: Update profile data.
export async function POST(request: Request) {
    const session = await getServerActionSession();
    if (!session.isLoggedIn || !session.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Missing or invalid authorization header" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (token !== session.user.access_token) {
        return NextResponse.json({ error: "Access token does not match session" }, { status: 403 });
    }

    try {
        // Parse the form data from the request.
        const formData = await request.formData();
        const file = formData.get("profilePicture");
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to base64 (for example purposes).
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Here, you'd typically store the file (or dataUrl) in your database.
        // For our example, we'll just return the updated profile data.
        const data = {
            username: defaultProfile.username,
            profilePicture: dataUrl,
        };

        return NextResponse.json({ message: "Profile updated", data });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({ error: "Error processing POST request" }, { status: 500 });
    }
}
