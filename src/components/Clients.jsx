import Image from "next/image"
import { getClients } from "@/lib/sanity"
import { urlFor } from "../../sanity/lib/image"

export async function Clients() {
  const clients = await getClients()

  return (
    <section className="bg-white py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-boldstrom  text-[#1a1a1a]">
            #CLIENTES<span className="not-italic">—</span>
          </h2>
          <p className="text-5xl md:text-5xl lg:text-6xl font-boldstrom text-[#FF2E8D]">
            BOLDNESS
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 md:gap-6">
          {clients.map((client) => {
            const logoUrl = client.logo ? urlFor(client.logo).width(280).height(160).url() : null
            return (
              <div
                key={client._id}
                className="bg-white rounded-[30px] shadow-md hover:shadow-lg transition-shadow p-3 md:p-8 flex items-center justify-center aspect-square border border-black"
              >
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={`Logo de ${client.name}`}
                    width={180}
                    height={120}
                    className="object-contain max-h-20 md:max-h-20 w-auto"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
