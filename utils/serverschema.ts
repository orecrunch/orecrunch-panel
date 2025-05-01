import { z } from "zod"

export const AttachRequestSchema = z.object({
    "id": z.string()
})