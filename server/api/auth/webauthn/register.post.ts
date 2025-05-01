import { eq } from "drizzle-orm";
import { credentials } from "~/database/schema";

const db = useDrizzle();

export default defineWebAuthnRegisterEventHandler({
  async validateUser(userBody, event) {
  
    const user = await db.query.users.findFirst({
      where: (user) => eq(user.email, userBody.userName)
    })

    if (!user) throw createError({ statusCode: 400, message: "User not found!" })

    if (!user.email && user.email !== userBody.userName) {
      throw createError({ statusCode: 400, message: 'Email not matching curent session' })
    }

    return {
      userName: user.email,
    }


  },
  async onSuccess(event, { credential, user:webauthUser}) {

   const user = await db.query.users.findFirst({
      where: (user) => eq(user.email, webauthUser.userName)
    })

    if(!user) {
      throw createError({
        statusCode: 400,
        message: "User not found!"
      })
    }
    
   await db.insert(credentials).values({
    userId: user!.id,
    id: credential.id,
    counter: credential.counter,
    backedUp: credential.backedUp,
    transports: credential.transports,
    publicKey: credential.publicKey,
    type: "passkey",
   })

  }
})