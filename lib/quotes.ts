import { supabase } from './supabase'

export interface Quote {
  author_slug: string | null
  id: number
  text: string
  author: string
  created_at: string | null
  author_name?: string
  uuid?: string
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

export async function getQuoteById(id: string): Promise<Quote | null> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*, authors(name)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching quote:', error)
    return null
  }

  return {
    ...data,
    author_name: data.authors?.name || 'Unknown Author',
  }
}