import hash from 'string-hash'
import isURL from 'validator/es/lib/isURL'

export interface Redirect {
  to: string
  from: string
  proxied: boolean
}

interface RedirectProps {
  to: string
  from?: string
  proxied?: boolean
}

export const createRedirect = (props: RedirectProps): Redirect => {
  const to = createDestinationURL(props.to)
  const from = createOriginURL(props.from, props.to)
  const proxied = !!props.proxied

  return {
    from,
    to,
    proxied,
  }
}

const createDestinationURL = (to: string): string => {
  const hasProtocol = !!to.match(/^https?:\/\//)
  const linkWithProtocol = hasProtocol ? to : 'https://' + to

  if (!isURL(linkWithProtocol)) {
    throw new InvalidURLError(to)
  }

  return linkWithProtocol
}

const createOriginURL = (from?: string, to?: string): string => {
  if (from) {
    return '/' + from.replace(/^\//, '')
  }
  if (!to) {
    throw new Error('Origin and destination URL are both undefined')
  }
  return shorten(to)
}

const shorten = (link: string): string => {
  const randomString = (Math.random() * 1e6).toString(36)
  return '/' + hash(link + randomString).toString(36)
}

export class InvalidURLError extends Error {
  constructor(url: string) {
    super(`${url} is not a valid link. You can try again with different link.`)
    this.name = 'InvalidURLError'
  }
}

export class DuplicateLinkError extends Error {
  constructor(url: string) {
    super(`${url} is taken. You can try again with different link.`)
    this.name = 'DuplicatedLinkError'
  }
}
