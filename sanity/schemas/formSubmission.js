export default {
  name: 'formSubmission',
  title: 'Formularios de Contacto',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    },
    {
      name: 'mensaje',
      title: 'Mensaje',
      type: 'text',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Fecha de envío',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Fecha de envío, más reciente primero',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sin nombre',
        subtitle: subtitle || 'Sin email',
      }
    },
  },
}
