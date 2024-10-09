export default async function GET(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelName = process.env.CHANNEL_NAME

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${channelName}&type=channel&part=snippet`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch channel')
    }

    const data = await response.json()

    if (data.items.length === 0) {
      throw new Error('Channel not found')
    }

    const channelId = data.items[0].id.channelId

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`,
    )

    if (!videoResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videoData = await videoResponse.json()
    res.status(200).json(videoData.items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
