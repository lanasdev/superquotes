import { supabase } from '../../lib/supabase'

export interface Quote {
  id: number
  text: string
  author: string
  created_at: string
}

export async function getQuotes(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quotes:', error)
    return []
  }

  return data || []
}

export async function addQuote(quote: { text: string; author: string }): Promise<Quote | null> {
  const { data, error } = await supabase
    .from('quotes')
    .insert([quote])
    .select()

  if (error) {
    console.error('Error adding quote:', error)
    return null
  }

  return data[0]
}

