import * as schema from "../../database/schema"

const { permissions } = schema;
const db = useDrizzle()
export default defineTask({
    // give the task a name and a description
    meta: {
        name: 'db:seed',
        description: 'Run database seed task'
    },
    async run() {
        await db.delete(permissions);
        const permission = [
            {
                permission: "owner"
            },
            {
                permission: "edit"
            },
            {
                permission: "view"
            }
        ]
        const result = await db.insert(permissions).values(permission);

        return {
            "result": result
        }
    }
})