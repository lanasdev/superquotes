import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? '[REDACTED]' : 'undefined')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing:', {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl || 'undefined',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? '[REDACTED]' : 'undefined'
  })
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type { User } from '@supabase/supabase-js'

export interface Author {
  id: number
  name: string
  bio: string | null
  created_at: string
}

export async function getAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching authors:', error)
    return []
  }

  return data || []
}

export async function getAuthorById(id: number): Promise<Author | null> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching author:', error)
    return null
  }

  return data
}

export async function getQuotesByAuthorId(authorId: number): Promise<Quote[]> {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching quotes by author:', error)
    return []
  }

  return data || []
}

export async function getQuotes(): Promise<Quote[]> {
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
    author_id: quote.author_id
  }))
}

export interface Quote {
  id: number
  text: string
  author: string
  author_id: number
  created_at: string
}

