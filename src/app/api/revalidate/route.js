import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * API route para revalidación bajo demanda.
 * Sanity envía un webhook aquí cuando se publica contenido.
 *
 * Configura el webhook en: https://sanity.io/manage → API → Webhooks
 * URL: https://tu-dominio.com/api/revalidate
 * Añade header: Authorization: Bearer <REVALIDATION_SECRET>
 */
export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization')
    const secret = process.env.REVALIDATION_SECRET

    if (!secret) {
      console.error('[revalidate] REVALIDATION_SECRET no configurado')
      return NextResponse.json(
        { error: 'Revalidación no configurada' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const docType = body?._type
    const slug = body?.slug?.current ?? body?.slug

    const revalidated = []

    const revalidate = (path) => {
      revalidatePath(path)
      revalidated.push(path)
    }

    switch (docType) {
      case 'blogPost':
        revalidate('/blog')
        if (slug) revalidate(`/blog/${slug}`)
        break
      case 'service':
        revalidate('/servicios')
        if (slug) revalidate(`/servicios/${slug}`)
        break
      case 'portfolioItem':
        revalidate('/portafolio')
        revalidate('/')
        if (slug) revalidate(`/portafolio/${slug}`)
        break
      case 'client':
      case 'siteConfig':
      case 'navigation':
        revalidate('/')
        revalidate('/blog')
        revalidate('/servicios')
        revalidate('/portafolio')
        break
      default:
        revalidate('/')
        revalidate('/blog')
        revalidate('/servicios')
        revalidate('/portafolio')
    }

    return NextResponse.json({
      revalidated,
      docType: docType || 'unknown',
    })
  } catch (error) {
    console.error('[revalidate] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Error al revalidar' },
      { status: 500 }
    )
  }
}
