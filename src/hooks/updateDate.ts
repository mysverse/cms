import type { CollectionAfterOperationHook } from 'payload'

export const updateLastUpdatedHook: CollectionAfterOperationHook = async ({ req, operation }) => {
  if (operation === 'update' || operation === 'create' || operation === 'delete') {
    await req.payload.updateGlobal({
      req,
      slug: 'site-settings',
      data: {
        lastUpdated: new Date().toISOString(),
      },
    })
  }
}
