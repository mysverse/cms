import type { CollectionAfterChangeHook } from 'payload'

export const updateLastUpdatedHook: CollectionAfterChangeHook = async ({ req }) => {
  await req.payload.updateGlobal({
    req,
    slug: 'site-settings',
    data: {
      lastUpdated: new Date().toISOString(),
    },
  })
}
