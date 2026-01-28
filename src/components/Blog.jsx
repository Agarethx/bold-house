"use client"

import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "MARKETING DIGITAL EN 2026",
    image: "/blog/post-1.jpg",
    date: "28 ENE 2026",
    readTime: "8/10 MIN READ",
  },
  {
    id: 2,
    title: "PROMTS TENDENCIA IA",
    image: "/blog/post-2.jpg",
    date: "04 FEB 2026",
    readTime: "8 MIN READ",
  },
]

export function Blog() {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl leading-none">
          <span className="font-boldstrom text-[#1a1a1a]">#BLOG —</span>
          <br />
          <span className="font-boldstrom-outline">
            BOLD
          </span>
        </h2>
      </div>

      {/* Blog Posts */}
      <div className="space-y-12 mb-12">
        {blogPosts.map((post) => (
          <article key={post.id} className="cursor-pointer group">
            <h3 className="font-bold text-lg md:text-xl text-[#1a1a1a] mb-4">
              {post.title}
            </h3>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-3">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {post.date} –{post.readTime}
            </p>
          </article>
        ))}
      </div>

      {/* Circular Button with rotating text */}
      <div className="flex justify-center">
        <button
          type="button"
          className="relative w-24 h-24 md:w-28 md:h-28 group"
          aria-label="Ver más artículos del blog"
        >
          {/* Rotating text circle */}
          <svg
            className="w-full h-full animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
              <textPath href="#circlePath">
                • BEBOLD • BELEADERS • BEBRAVE • BEBOLD
              </textPath>
            </text>
          </svg>

          {/* Center icon - 2x2 grid */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
              <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
            </div>
          </div>
        </button>
      </div>
    </section>
  )
}
