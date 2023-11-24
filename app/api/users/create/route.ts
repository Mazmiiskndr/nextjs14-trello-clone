import { createUser } from "@/services/userService";
import { User } from "@/types/userTypes";
import { NextRequest, NextResponse } from "next/server";

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req.method);

//   if (req.method === "POST") {
//     try {
//       const user: User = req.body;
//       const newUser = await createUser(user);
//       return res.status(200).json(newUser);
//     } catch (error: any) {
//       return res.status(400).json({ message: error.message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const userData: User = await request.json();
    const newUser = await createUser(userData);
    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
