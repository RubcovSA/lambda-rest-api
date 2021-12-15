import { handler } from '../api/top-3'

describe('top-3', () => {
  it('getting top 3 teams', async () => {
    const result = await handler(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { pathParameters: { league_id: '1' } },
      {},
      () => '',
    )
    expect(result).toBe({})
  })
})
