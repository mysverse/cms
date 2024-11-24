import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const updateLastUpdatedHook: CollectionAfterChangeHook & CollectionAfterDeleteHook = async ({
  req,
}) => {
  const lastUpdated = new Date().toISOString()
  await req.payload.updateGlobal({
    req,
    slug: 'site-settings',
    data: {
      lastUpdated,
    },
  })
}
