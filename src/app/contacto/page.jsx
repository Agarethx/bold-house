import { Formulario } from "@/components/Form"

export const metadata = {
  title: "Contacto | Bold House",
  description: "Contáctanos para soluciones creativas y asesoría estratégica. Conversemos.",
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <Formulario />
    </main>
  )
}
