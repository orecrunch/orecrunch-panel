import { User } from "#auth-utils";
import { eq } from "drizzle-orm";
import { credentials, users } from "~/database/schema";
import { z } from "zod";
import type { H3Event, EventHandlerRequest } from 'h3'
const db = useDrizzle();

export enum Provider {
  github = "github",
  google = "google"
}

export async function lookup(email: string, password: string): Promise<User>  {

  const user = (await db.select({id: users.id, email: users.email, image: users.image, name: users.name, password: users.hashPassword }).from(users).where(eq(users.email, email)))?.[0]


  if(!user || !(await verifyPassword(user.password, password))) {
   throw createError({
     statusCode: 401,
     statusMessage: "Invalid email or password"
   })
  }

  return {
      id: user.id,
      name: user.name,
      image: user.image,
      email: user.email,
      loggedInAt: new Date().toISOString(),
  };

}




export async function handleOAuth(event: H3Event<EventHandlerRequest>, provider: Provider, oauthUserId: string) {

  const credential =  await db.query.credentials.findFirst({
    where: (e) => eq(e.credentialsId, oauthUserId) && eq(e.type, provider.toString()),
    with: {
        user: true
    }
})

if (credential) {
    console.log("credentials found!");
    const user = credential.user;
   await setUserSession(event, {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            loggedInAt: new Date().toISOString(),
        }
    });
    return;
}


const session = await requireUserSession(event, {
    statusCode: 400,
    message:"You need to login, before you can link your Oauth account"
});

await db.insert(credentials).values({
    user_id: session.user?.id!,
    credentialsId: oauthUserId,
    type: provider.toString()
})
}