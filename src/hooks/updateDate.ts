import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

export const updateLastUpdatedHook: CollectionAfterChangeHook &
  CollectionAfterDeleteHook &
  GlobalAfterChangeHook = async ({ req }) => {
  const lastUpdated = new Date().toISOString()
  await req.payload.updateGlobal({
    req,
    slug: 'site-settings',
    data: {
      lastUpdated,
    },
  })
}
