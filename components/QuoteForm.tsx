'use client'

import { useState } from 'react'
import { addQuote } from '../lib/quotes'
import { useAuth } from '../app/contexts/AuthContext'

export default function QuoteForm() {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text && author) {
      setIsSubmitting(true)
      setError(null)
      const newQuote = await addQuote({ text, author })
      setIsSubmitting(false)
      if (newQuote) {
        setText('')
        setAuthor('')
        window.location.reload()
      } else {
        setError('Failed to add quote. Please try again.')
      }
    }
  }

  if (!user) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white shadow-md rounded-lg p-6">
      <div>
        <label htmlFor="quote-text" className="block text-sm font-medium text-gray-700">
          Quote
        </label>
        <textarea
          id="quote-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="quote-author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="quote-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding Quote...' : 'Add Quote'}
      </button>
    </form>
  )
}

