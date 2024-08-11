import { parseCookies } from "nookies"

import api from "@/lib/api"

const fetchAuthUser = async (req, res) => {
  let authUser = null
  const sessionid = parseCookies({ req }).sessionid

  if (sessionid) {
    try {
      const response = await api.get("auth/user/me/", {
        headers: {
          Cookie: `sessionid=${sessionid}`,
        },
      })
      authUser = response.data
    } catch (error) {}
  }

  if (authUser) {
    res.json({
      isAuthenticated: true,
      ...authUser,
    })
  } else {
    res.json({
      isAuthenticated: false,
    })
  }
}

export default fetchAuthUser
