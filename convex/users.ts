import { ConvexError, v } from "convex/values"
import { internalMutation, query } from "./_generated/server"

export const getUserById = query({
    args: { 
        clerkId: v.string() 
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user
    },
})

export const getTopUserByPodcastCount = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").collect()

        const userData = await Promise.all(
            user.map(async (u) => {
                const stories = await ctx.db
                    .query("stories")
                    .filter((q) => q.eq(q.field("authorId"), u.clerkId))
                    .collect()

                const sortedStories = stories.sort((a, b) => b.views - a.views)

                return {
                    ...u,
                    totalStories: stories.length,
                    story: sortedStories.map((s) => ({
                        title: s.title,
                        storyId: s._id,
                    })),
                }
            })
        )

        return userData.sort((a, b) => b.totalStories - a.totalStories)
    },
})

export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('users', {
            clerkId: args.clerkId,
            email: args.email,
            imageUrl: args.imageUrl,
            name: args.name
        })
    },
})

export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        imageUrl: v.string(),
        email: v.string(),
    },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.patch(user._id, {
            imageUrl: args.imageUrl,
            email: args.email,
        })

        const stories = await ctx.db
            .query("stories")
            .filter((q) => q.eq(q.field("authorId"), args.clerkId))
            .collect()

        await Promise.all(
            stories.map(async (s) => {
                await ctx.db.patch(s._id, {
                    authorImageUrl: args.imageUrl,
                })
            })
        );
    },
})

export const deleteUser = internalMutation({
    args: { 
        clerkId: v.string() 
    },
    async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique()

        if (!user) {
            throw new ConvexError("User not found")
        }

        await ctx.db.delete(user._id)
    },
})