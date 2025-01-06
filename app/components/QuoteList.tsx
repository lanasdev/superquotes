'use client'

import { useState, useEffect } from 'react'
import Quote from './Quote'
import { getQuotes, Quote as QuoteType } from '../../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function QuoteList() {
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchQuotes() {
      const fetchedQuotes = await getQuotes()
      setQuotes(fetchedQuotes)
      setLoading(false)
    }
    fetchQuotes()
  }, [])

  if (loading) {
    return <div className="text-center mt-8">Loading quotes...</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Famous Quotes</h2>
      {quotes.length === 0 ? (
        <p className="text-center text-gray-500">No quotes found. {user ? 'Be the first to add one!' : 'Sign in to add a quote!'}</p>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Quote key={quote.id} text={quote.text} author={quote.author} authorId={quote.author_id} />
          ))}
        </div>
      )}
    </div>
  )
}

