// import asyncMiddleware from "./asyncMiddleware";
// import { generate, verify } from "../utils/jwtManager";
// import { user, User, NewUser } from "db/schema";
// import { db } from "db/db";
// import { eq } from "drizzle-orm";
// import { VerifiedUser, AuthRequest } from '../types/types';

// const authMiddleware = asyncMiddleware<AuthRequest>(async (req, res, next) => {
//     const { authorization } = req.headers;
//     console.log(authorization)//TESTING
//     if (authorization && authorization.startsWith("Bearer")) {
//         const token = authorization.split(" ")[1];
//         const decoded = verify(token) as string; // can i assert ???
//         const verifyUser:VerifiedUser[] = await db
//             .select({
//                 id: user.id,
//                 username: user.username,
//                 email: user.email,
//                 bio: user.bio,
//                 profile_image_URL: user.profile_image_URL,
//                 created_at: user.created_at,
//             })
//             .from(user)
//             .where(eq(user.id, decoded));
//         if (verifyUser) {
//             req.user = verifyUser[0];
//             next();
//         } else {
//             res.status(401);
//             throw new Error("Not authorized, invalid token");
//         }
//     } else {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// });

// export default authMiddleware;
