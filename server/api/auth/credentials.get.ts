import { eq } from "drizzle-orm";

const db = useDrizzle()

export default defineEventHandler(async (event) => {

  const session = await requireUserSession(event, );

  const credentials = await db.query.credentials.findMany({
    where: (e) => eq(e.user_id, session.user.id)
  })

  
  return credentials
})
