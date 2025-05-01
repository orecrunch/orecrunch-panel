import { and, eq } from "drizzle-orm";

const db = useDrizzle();
export default defineWebAuthnAuthenticateEventHandler({

    async allowCredentials(event, userName) {

        const user = await db.query.users.findFirst({
            where: (user) => eq(user.email, userName),
        })

        if (!user) throw createError({ statusCode: 400, statusMessage: "User not found!", message: "User not found!" })

        const validCredentails = await db.query.credentials.findMany({
            where: (e) => and(eq(e.type, "passkey"), eq(e.userId, user.id))
        })

        return validCredentails.map((value) => {
            return {
                id: value.id

            }
        })

    },
    async getCredential(event, credentialId) {
        const credential = await db.query.credentials.findFirst({
            where: (e) => eq(e.id, credentialId),
            with: {
                user: true
            }
        })

        if (!credential)
            throw createError({ statusCode: 400, message: 'Credential not found' })

        return {
            id: credential.id!,
            publicKey: credential.publicKey!,
            transports: credential.transports!,
            counter: credential.counter!,
            backedUp: Boolean(credential.backedUp!),
            user: credential.user
        };
    },

    async onSuccess(event, { credential, authenticationInfo }) {

        // Set the user session
        const user = credential.user;
        await setUserSession(event, {
            user: {
                id: user!.id,
                image: user!.image,
                name: user!.name,
                email: user!.email,
                loggedInAt: new Date().toISOString()
            },
        })
    },
})