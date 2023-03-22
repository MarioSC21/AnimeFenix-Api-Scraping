import { config } from 'dotenv'
config()

export default {
  port: process.env.PORT ?? 3000,
  proxy: process.env.PROXY ?? 'https://api.zenrows.com/v1/?apikey=b2ab7b5867028db2d36064fcf9e23a7296966d91&url=https%3A%2F%2Fwww.animefenix.tv%2F&antibot=true'
}
