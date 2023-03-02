export interface WebHook {
  object: string
  entry: Array<{
    id: string
    time: string
    changes: Array<{
      field: string
      value: {
        sender: {
          id: string
        }
        recipient: {
          id: string
        }
        timestamp: string
        message: {
          mid: string
          text: string
        }
      }
    }>
    messaging?: Array<{
      message: string
      postback: string
      delivery: string
    }>
  }>
}
