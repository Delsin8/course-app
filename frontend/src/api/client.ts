interface ICustomConfig {
  headers?: {}
}

interface IConfig {
  method: string
  headers: {}
  body?: BodyInit | null | undefined
}

interface IClient {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: BodyInit | null | undefined
  customConfig: ICustomConfig
}

export const client = async ({
  endpoint,
  method,
  body,
  customConfig = {},
}: IClient) => {
  const headers = { 'Content-Type': 'application/json' }

  const config: IConfig = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    body,
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint: string, customConfig = {}) {
  return client({ endpoint, method: 'GET', customConfig: { ...customConfig } })
}

client.post = function (
  endpoint: string,
  body: BodyInit | null | undefined,
  customConfig = {}
) {
  return client({
    endpoint,
    method: 'POST',
    body,
    customConfig: { ...customConfig },
  })
}

client.put = function (
  endpoint: string,
  body: BodyInit | null | undefined,
  customConfig = {}
) {
  return client({
    endpoint,
    method: 'PUT',
    body,
    customConfig: { ...customConfig },
  })
}

client.delete = function (endpoint: string, customConfig = {}) {
  return client({
    endpoint,
    method: 'DELETE',
    customConfig: { ...customConfig },
  })
}
