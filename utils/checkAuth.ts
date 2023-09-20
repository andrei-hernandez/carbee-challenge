import nookies from "nookies"
import { GetServerSidePropsContext } from "next"

//extract the token from nookies, if there is a token, return it, if not, redirect to login page using ctx.writeHead
export const checkAuth = (ctx: GetServerSidePropsContext): { token: string } => {
  const cookies = nookies.get(ctx)

  if (!cookies.token) {
    ctx.res.writeHead(302, { Location: "/login" })
    ctx.res.end()
  }

  return {
    token: cookies.token
  }
}
