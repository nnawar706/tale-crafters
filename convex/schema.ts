import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    stories: defineTable({
        user: v.id('users'),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        title: v.string(),
        detail: v.string(),
        imagePrompt: v.string(),
        imageUrl: v.optional(v.string()),
        imageStorageId: v.optional(v.id('_storage')),
        audioUrl: v.optional(v.string()),
        audioStorageId: v.optional(v.id('_storage')),
        voicePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'title' }),

    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        imageUrl: v.string()
    })
})