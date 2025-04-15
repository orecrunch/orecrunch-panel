
import { handleOAuth, Provider } from "~/server/utils/auth";

export default defineOAuthGitHubEventHandler({
    
   async onSuccess(event, result) {
       await handleOAuth(event, Provider.github, result.user.id);
    },
    onError(e) {
        console.log(e)
    },
    config: {
        emailRequired: true
    }
})

