
import { handleOAuth, Provider } from "~/server/utils/auth";

export default defineOAuthGoogleEventHandler({
   async onSuccess(event, result) {
       await handleOAuth(event, Provider.google, result.user.sub);
    },
    onError(e) {
        console.log(e)
    },

})

