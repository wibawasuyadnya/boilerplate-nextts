//app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { setSession } from "@/lib/iron-config/session";
import { DateTime } from "luxon";

const helper = async (request: Request) => {
  try {
    const { username, first_name, last_name, email, access_token } =
      await request.json();

    // Get Server time utc-6
    const now = DateTime.now().setZone("UTC-6");

    const response = NextResponse.json({ success: true });

    await setSession(request, response, {
      user: {
        username,
        first_name,
        last_name,
        email,
        access_token,
      },
      isLoggedIn: true,
      timerStartTime: now.toMillis(),
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
};

export { helper as POST };
