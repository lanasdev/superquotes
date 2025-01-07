import { supabase } from './supabase'

export async function getAuthors(): Promise<Author[]> {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('slug')
  
    if (error) {
      console.error('Error fetching authors:', error)
      return []
    }
  
    return data || []
  }


export async function getAuthorBySlug(slug: string): Promise<Author | null> {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('slug', slug)   
      .single()
  
    if (error) {
      console.error('Error fetching author:', error)
      return null
    }
  
    return data
  }
  
  export async function getQuotesByAuthorSlug(authorSlug: string): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('author_slug', authorSlug)
      .order('created_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching quotes by author:', error)
      return []
    }
  
    return data || []
  }