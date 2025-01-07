import Quote from './Quote'
import { getQuotesForHome } from '@/lib/quotes'
import { Tables } from '../database.types'
import Link from 'next/link'

export default async function QuoteList() {
  const quotes = await getQuotesForHome()

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Famous Quotes</h2>
      {quotes.length === 0 ? (
        <div className="">
          <p className="text-center text-gray-500">No quotes found.</p>
          <Link href="/signin">Be the first one to create one.</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Quote key={quote.id} text={quote.text} author={quote.author} author_slug={quote.author_slug} />
          ))}
        </div>
      )}
    </div>
  )
}
