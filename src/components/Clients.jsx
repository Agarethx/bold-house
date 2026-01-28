"use client"

import Image from "next/image"

const clients = [
  { name: "Nike", logo: "/clients/NIKE.svg" },
  { name: "Danone", logo: "/clients/Danone_logo.svg" },
  { name: "La Roche-Posay", logo: "/clients/La_roche_porsay_logo.svg" },
  { name: "Bci", logo: "/clients/Bci_logo.svg" },
  { name: "OPPO", logo: "/clients/Oppo_logo.svg" },
  { name: "Metrogas", logo: "/clients/Metrogas_logo.svg" },
  { name: "Hisense", logo: "/clients/Hisense_logo.svg" },
  { name: "Xiaomi", logo: "/clients/Xiaomi_logo.svg" },
  { name: "L'Oréal", logo: "/clients/Loreal_logo.svg" },
]

export function Clients() {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-boldstrom  text-[#1a1a1a]">
            #CLIENTES<span className="not-italic">—</span>
          </h2>
          <p
            className="text-5xl md:text-5xl lg:text-6xl font-boldstrom text-[#e74895]"
          >
            BOLDNESS
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-[50px] shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 flex items-center justify-center aspect-square border border-black"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`Logo de ${client.name}`}
                width={140}
                height={80}
                className="object-contain max-h-16 md:max-h-20 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
