"use client"

import React from "react"

import { useState } from "react"

export function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <section id="contacto" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-xl">
        <div className="mb-8">
          <h2 className="text-5xl md:text-6xl font-boldstrom leading-none">
            <span className="text-[#1a1a1a]">#CON—</span>
          </h2>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-boldstrom text-[#e74895]">
            TACTO
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-sm md:text-base font-medium text-[#1a1a1a] mb-10 leading-relaxed">
          SOLUCIONES CREATIVAS Y ASESORÍA
          <br />
          ESTRATÉGICA PARA MARCAS BOLDNESS.
          <br />
          CONVERSEMOS.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="NOMBRE"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-6 py-4 border-2 border-[#1a1a1a] rounded-full text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent"
          />

          <input
            type="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-6 py-4 border-2 border-[#1a1a1a] rounded-full text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent"
          />

          <textarea
            placeholder="MENSAJE"
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            rows={6}
            className="w-full px-6 py-4 border-2 border-[#1a1a1a] rounded-3xl text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#E91E8C] focus:border-transparent resize-none"
          />

          <button
            type="submit"
            className="w-full py-4 bg-[#E91E8C] hover:bg-[#d11a7d] text-white font-bold text-sm tracking-wider rounded-full transition-colors mt-4"
          >
            ENVIAR
          </button>
        </form>
      </div>
    </section>
  )
}
