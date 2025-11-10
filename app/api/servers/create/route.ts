// import { NextResponse } from "next/server";
// import { createServer } from "@/lib/servers/createServer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = await createServer(body);
//     return NextResponse.json(data);
//   } catch (err: unknown) {
//     console.error("Create server error:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           err instanceof Error
//             ? err.message
//             : "Unknown error while creating server.",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createServer } from "@/lib/servers/createServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await createServer(body);

    // ✅ Always return valid JSON
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Create server error:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unknown error while creating server.",
      },
      { status: 500 }
    );
  }
}
