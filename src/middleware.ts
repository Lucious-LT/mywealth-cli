export { default } from "next-auth/middleware";
//
// export const config = {
//     matcher: ["/dashboard", "/invest/:path*", "/banking/:path*"],
// };


export const config = {
  matcher: [
    "/bank",
    "/dashboard",
    "/invest/:path*",
    "/insure/:path*",
    "/profile/:path*",
    "/signin"
  ],
};
