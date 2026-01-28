import Image from "next/image"

export function BigBanner() {
  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* BE BOLD Text */}
        <div className="flex flex-col items-start leading-[20px]">
          <div className="flex items-center">
            {/* Pink chevron */}
            <span className="text-[#e74895] font-black text-[150px] sm:text-7xl md:text-8xl lg:text-9xl leading-none mr-1 font-boldstrom">
              {'>'}
            </span>
            <span className="font-black text-[#242129] text-[150px] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none font-boldstrom">
              BE
            </span>
          </div>
          <span className="font-black text-[#242129] text-[150px] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight -mt-2 md:-mt-4 font-boldstrom leading-[104px]">
            BOLD
          </span>
        </div>

        {/* be brave, be leader text */}
        <p className="italic text-[#242129] text-[80px] sm:text-2xl md:text-3xl mt-1 md:mt-6 font-hoteight">
          be brave, be leader.
        </p>

        {/* Gradient Image */}
        <div className="w-full max-w-3xl mt-8 md:mt-12">
          <Image
            src="/img/VIDEO_.png"
            alt="Bold House - Be Bold, Be Brave, Be Leaders"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Copyright */}
        <p className="text-[#242129] font-medium text-sm md:text-base mt-6">
          © 06126
        </p>
      </div>
    </section>
  )
}
