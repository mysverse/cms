import { getNews } from '@/utils/getNews'

export const GET = async () => {
  const news = await getNews()
  return Response.json(news)
}
