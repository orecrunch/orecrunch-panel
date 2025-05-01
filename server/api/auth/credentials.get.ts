import { and, eq, not } from "drizzle-orm";

const db = useDrizzle()

export default defineEventHandler(async (event) => {


  const session = await requireUserSession(event, );

  const query = getQuery(event);
  if(query.exclude) {
    return await db.query.credentials.findMany({
      where: (e) => and( eq(e.userId, session.user.id), not(eq(e.type, query.exclude as string))),
    })
  
  }else if (query.include) {
    return await db.query.credentials.findMany({
      where: (e) => and( eq(e.userId, session.user.id), eq(e.type, query.include as string)),
    })
     
  }

  const credentials = await db.query.credentials.findMany({
    where: (e) => eq(e.userId, session.user.id)
  })
 
  return credentials
})
