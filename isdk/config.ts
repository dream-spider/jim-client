interface IIsdkAxiosConfig {
  requestContext: string
}
interface IIsdkConfig {
  axios: IIsdkAxiosConfig
}

let isdkConfig: IIsdkConfig = {
  axios: {
    requestContext: ''
  }
}

export function configIsdk (config: IIsdkConfig) {
  isdkConfig = config
}

export function getIsdkConfig () {
  return isdkConfig
}