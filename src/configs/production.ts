import { Config } from './index'

const production = (): Config => {
  return {
    environment: process.env.NODE_ENV || 'production',
    discordToken: process.env.DISCORD_TOKEN || '',
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || '',
    OPENAI_KEY: process.env.OPENAI_KEY || '',
    OPENAI_ORG: process.env.OPENAI_ORG || '',
  }
}

export default production
