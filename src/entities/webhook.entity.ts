export interface WebHook {
  object: string
  entry: Array<{
    id: string
    time: string
    messaging?: Array<{
      message: {
        mid: string
        text: string
      }
      sender: {
        id: string
      }
      recipient: {
        id: string
      }
      timestamp: number
    }>
  }>
}
