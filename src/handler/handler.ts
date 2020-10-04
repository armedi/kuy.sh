import { DB } from '../db'
import { createRedirect, InvalidURLError, Redirect } from '../redirect'

export const createHandler = (db: DB) => {
  const handleRequest = async (request: Request): Promise<Response> => {
    if (request.method === 'GET') {
      return handleGET(request)
    } else if (request.method === 'POST') {
      return handlePOST(request)
    } else {
      return new Response(null, { status: 405 })
    }
  }

  const handleGET = async (request: Request) => {
    const pathname = new URL(request.url).pathname

    let location: string
    try {
      const redirect = await db.get(pathname)
      location = redirect.to
    } catch (error) {
      location = 'https://www.kuy.app'
    }

    return new Response(null, {
      status: 301,
      headers: { Location: location },
    })
  }

  interface ShortenLinkDTO {
    link: string
  }

  const handlePOST = async (request: Request) => {
    try {
      const { link } = (await request.json()) as ShortenLinkDTO

      let redirect: Redirect
      do {
        redirect = createRedirect({ to: link })
      } while (await db.exists(redirect.from))

      const result = await db.save(redirect)

      return JSONResponse(
        {
          success: true,
          data: {
            link: result.to,
            shortLink: result.from,
          },
        },
        201,
      )
    } catch (error) {
      let message = 'Something went wrong'

      if (error instanceof InvalidURLError) {
        message = error.message
      }

      return JSONResponse({ success: false, message }, 400)
    }
  }

  return handleRequest
}

const JSONResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
