'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function agregarObjetivo(formData: FormData) {
  // Extraemos los datos del formulario usando los "name" de los inputs
  const nombre = formData.get('nombre') as string
  const precio = parseFloat(formData.get('precio') as string)
  const ahorrado = parseFloat(formData.get('ahorrado') as string)

  // Insertamos en la tabla 'objetivos' de Supabase
  const { error } = await supabase
    .from('objetivos')
    .insert([
      { 
        nombre: nombre, 
        precio: precio, 
        ahorrado: ahorrado 
      }
    ])

  if (error) {
    console.error('Error al guardar en Supabase:', error.message)
    throw new Error('No se pudo guardar el objetivo')
  }

  // Esto limpia la caché de la página actual para que los datos se refresquen
  revalidatePath('/')
}

export async function obtenerObjetivos() {
  const { data, error } = await supabase
    .from('objetivos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener objetivos:', error.message)
    return []
  }

  return data
}

export async function agregarGasto(formData: FormData) {
  const nombre = formData.get('nombre') as string
  const precio = parseFloat(formData.get('precio') as string)
  const categoria = formData.get('categoria') as string || 'General'

  const { error } = await supabase
    .from('gastos')
    .insert([{ nombre, precio, categoria }])

  if (error) {
    console.error('Error al guardar gasto:', error.message)
    throw new Error('No se pudo guardar el gasto')
  }

  revalidatePath('/')
}

export async function obtenerGastosDelDia() {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const hoyISO = hoy.toISOString()

  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .gte('created_at', hoyISO)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener gastos:', error.message)
    return []
  }

  return data
}