import { PortableText } from '@portabletext/react'

const listCardComponents = {
  block: {
    normal: ({ children }) => (
      <span className="text-lg md:text-xl font-light tracking-wide ">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-boldstrom text-[#1a1a1a]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

const carouselComponents = {
  block: {
    normal: ({ children }) => (
      <span className="text-5xl md:text-3xl font-boldstrom text-white">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-boldstrom text-white not-italic">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
  },
}

const heroComponents = {
  block: {
    normal: ({ children }) => (
      <span className="font-boldstrom-outline text-[#1a1a1a]">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-boldstrom text-[#1a1a1a] not-italic">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

function renderTitle(value, components, { stringClassName = '' } = {}) {
  if (value == null) return null
  if (typeof value === 'string') {
    return <span className={stringClassName}>{value}</span>
  }
  return <PortableText value={value} components={components} />
}

/** Tarjetas de listado / relacionados: solo `item.title` del CMS; el `>` va en el padre. */
export function ServiceListTitle({ value }) {
  return renderTitle(value, listCardComponents, {
    stringClassName: 'text-lg md:text-xl font-boldstrom',
  })
}

export function ServiceCarouselTitle({ value }) {
  return renderTitle(value, carouselComponents, {
    stringClassName: 'text-5xl md:text-3xl text-white',
  })
}

/** H1 de detalle de servicio: solo `item.title` del CMS; el `>` va en el padre. */
export function ServiceHeroTitle({ value }) {
  return renderTitle(value, heroComponents, {
    stringClassName: 'text-[#1a1a1a] font-boldstrom font-normal',
  })
}
