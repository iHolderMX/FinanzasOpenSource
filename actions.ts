'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function agregarObjetivo(formData: FormData) {
  const nombre = formData.get('nombre')
  const precio = parseFloat(formData.get('precio') as string)
  const ahorrado = parseFloat(formData.get('ahorrado') as string)

  const { error } = await supabase
    .from('objetivos')
    .insert([{ nombre, precio, ahorrado }])

  if (error) {
    console.error('Error al guardar:', error.message)
    return
  }

  // Esto refresca la página para mostrar los nuevos datos automáticamente
  revalidatePath('/')
}