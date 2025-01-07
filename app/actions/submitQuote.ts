"use server";

import { Database } from '@/database.types';
import { supabase } from '@/lib/supabase';
// export async function createQuote(formData: FormData) {

//   const rawFormData = {
//     authorSlug: formData.get("authorSlug"),
//     amount: formData.get("text"),
//   };
//   console.log(rawFormData)

//   // mutate data
//   // revalidate cache
// }


// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export interface QuoteFormDataProps {
  text: string,
  authorSlug: string,
  // authors: Database['public']['Tables']['authors']['Row'][]
}

export async function submitQuote({ text, authorSlug }: QuoteFormDataProps) {
  // const { data, error } = await supabase.from('quotes').select(`
  //   uuid, 
  //   text, 
  //   author_slug ( slug, name )
  // `)
  // console.log("data", data)

  console.log('Formular-Daten:', { text, authorSlug })

  if (!text || !authorSlug) {
    return { error: 'Quote and Author are required' }
  }

  const { data, error } = await supabase
    .from('quotes')
    .insert([
      { text, author_slug: authorSlug },
    ])
    .select()



  if (error) {
    return { error: error.message }
  }

  return { success: true, data }
}

