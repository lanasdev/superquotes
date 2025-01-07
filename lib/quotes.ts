import { supabase } from './supabase'

export interface Quote {
  author_slug: string
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

  return data
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


export async function getQuotesForHome(): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, authors(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quotes:', error)
    return []
  }

  return (data || []).map(quote => ({
    ...quote,
    author: quote.authors?.name || 'Unknown Author',
    author_slug: quote.author_slug
  }))
}