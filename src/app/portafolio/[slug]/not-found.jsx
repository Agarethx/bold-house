import Link from "next/link"

export default function NotFound() {
  return (
    <div className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-boldstrom text-[#1a1a1a] mb-4">
        Proyecto no encontrado
      </h1>
      <p className="text-gray-500 mb-8">
        El proyecto que buscas no existe o ha sido eliminado.
      </p>
      <Link
        href="/portafolio"
        className="px-6 py-2 border border-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors"
      >
        Volver al portafolio
      </Link>
    </div>
  )
}
