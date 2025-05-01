import { and, eq } from "drizzle-orm";
import { credentials } from "~/database/schema";
import { deleteCredentialsSchema } from "~/utils/authschema";

const db = useDrizzle()

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {data:credential, error} = deleteCredentialsSchema.safeParse(body);

  if(!credential) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    })
  }

  const session = await requireUserSession(event);


 await db.delete(credentials).where(and(
    eq(credentials.type, credential!.type),
   eq(credentials.userId, session.user.id),
   eq(credentials.publicKey, credential.credentialsId)
  ))


  

})
