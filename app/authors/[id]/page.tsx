import { getAuthorById, getQuotesByAuthorId } from '../../../lib/supabase'
import Quote from '../../components/Quote'

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const authorId = parseInt(params.id)
  const author = await getAuthorById(authorId)
  const quotes = await getQuotesByAuthorId(authorId)

  if (!author) {
    return <div>Author not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
      {author.bio && <p className="text-gray-600 mb-6">{author.bio}</p>}
      <h2 className="text-2xl font-semibold mb-4">Quotes</h2>
      <div className="space-y-4">
        {quotes.map((quote) => (
          <Quote key={quote.id} text={quote.text} author={author.name} />
        ))}
      </div>
    </div>
  )
}

