"use client"

import React from "react"

import { useState } from "react"

export function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar")
      }

      setStatus("success")
      setFormData({ nombre: "", email: "", mensaje: "" })
    } catch (err) {
      setStatus("error")
      setErrorMessage(err.message || "Error al enviar. Intenta nuevamente.")
    }
  }

  return (
    <section id="contacto" className="bg-white py-8 md:py-24">
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

        {/* Feedback */}
        {status === "success" && (
          <p className="text-sm font-medium text-green-600 mb-4">
            ¡Mensaje enviado! Nos pondremos en contacto pronto.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-600 mb-4">{errorMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="NOMBRE"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-6 py-4 border border-[#1a1a1a] rounded-full text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e74895] focus:border-transparent"
          />

          <input
            type="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-6 py-4 border border-[#1a1a1a] rounded-full text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e74895] focus:border-transparent"
          />

          <textarea
            placeholder="MENSAJE"
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            rows={6}
            className="w-full px-6 py-4 border border-[#1a1a1a] rounded-3xl text-sm font-medium placeholder:text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e74895] focus:border-transparent resize-none"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#e74895] hover:bg-[#e74895] text-white text-[22px] tracking-wider px-6 py-4 rounded-full transition-colors w-full font-ambit text-center"
          >
            {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
          </button>
        </form>
      </div>
    </section>
  )
}
