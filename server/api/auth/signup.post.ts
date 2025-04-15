import { z } from "zod";
import { users } from "~/database/schema";
import { SignupSchema } from "~/utils/authschema";



export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data:user, error} =  SignupSchema.safeParse(body);

  if(error) {
    return createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: error.message
    })
  }

  try {
   await useDrizzle().insert(users).values({
      name: user.name,
      hashPassword: await hashPassword(user.password),
      image: user.image,
      email: user.email,
    })
  } catch(e) {
    return createError({
      statusCode: 401,
      statusMessage: "Forbidden",
      message: "User already exists"
    })
  }

})
