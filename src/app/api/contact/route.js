import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeClient } from '../../../lib/sanityWriteClient'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, email, mensaje } = body

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    const submittedAt = new Date().toISOString()

    // 1. Guardar en Sanity
    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create({
        _type: 'formSubmission',
        nombre: nombre.trim(),
        email: email.trim(),
        mensaje: mensaje.trim(),
        submittedAt,
      })
    }

    // 2. Enviar email con Resend
    const contactEmail = process.env.CONTACT_EMAIL
    if (process.env.RESEND_API_KEY && contactEmail) {
      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM || 'Bold House <onboarding@resend.dev>',
        to: contactEmail,
        replyTo: email.trim(),
        subject: `Nuevo contacto: ${nombre.trim()}`,
        html: `
          <h2>Nuevo mensaje desde el formulario de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje.trim().replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Enviado el ${new Date(submittedAt).toLocaleString('es-CL')}</small></p>
        `,
      })

      if (error) {
        console.error('Error enviando email:', error)
        return NextResponse.json(
          { error: 'Error al enviar el correo. Intenta nuevamente.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en /api/contact:', error)
    return NextResponse.json(
      { error: 'Error al procesar el formulario. Intenta nuevamente.' },
      { status: 500 }
    )
  }
}
