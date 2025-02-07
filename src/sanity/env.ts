export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-02'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skTGghEQB8Yio35eORapvAaEZ1RkU5AwZ6FffhuTpsHOmskFyTZqDBlkrWj1Lgnh4HZdgdw1SfnIx3zoud31Xv3uRN8Z5SUq2HP6qBqPilGcLauBSYO5l5gRjrKursLap0F9HQ9CzVUU9eHR76NLxTR22DQxEiMINyoRlK3YzZDJPyfDNvRx",
  'Missing environment variable: SANITY_API_TOKEN'
)


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
