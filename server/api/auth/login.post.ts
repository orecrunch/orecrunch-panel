import { lookup } from "~/server/utils/auth"
import { LoginSchema } from "~/utils/authschema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {data:loginData, error} = LoginSchema.safeParse(body);
  
  if(error) {
    return createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: error.message
    })
  }

  

  const user = await lookup(loginData.email, loginData.password);

  await setUserSession(event, {
    user: user,
    
  })

})
