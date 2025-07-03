// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const username = "admin";
// const password = "";
// const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString( "base64" )}`;

// export function stagingAuthMiddleware(req: NextRequest): NextResponse | void {
//     const auth = req.headers.get("authorization");

//     if (auth === authHeader) {
//         return; 
//     }

//     return new NextResponse("Authentication Required", {
//         status: 401,
//         headers: {
//             "WWW-Authenticate": 'Basic realm="Secure Area"',
//         },
//     });
// }