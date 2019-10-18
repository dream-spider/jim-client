class Logger {
  enable = true

  constructor (enable: boolean) {
    this.enable = enable
  }

  log (title?: any, text?: any) {
    if (this.enable) {
      console.log(`[JimSDK LOG]: `, title, text)
    }
  }

  info (title?: any, text?: any) {
    if (this.enable) {
      text ? console.info(`[JimSDK INFO]: `, title, text)
      : console.info(`[JimSDK INFO]: `, title)
    }
  }

  warn (title?: any, text?: any) {
    if (this.enable) {
      console.warn(`[JimSDK WARN]: `, title, text)
    }
  }

  error (title?: any, text?: any) {
    if (this.enable) {
      console.error(`[JiMSDK ERROR]: `, title, text)
    }
  }
}

export default Logger