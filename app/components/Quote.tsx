import Link from 'next/link'

interface QuoteProps {
  text: string
  author: string
  authorId: number
}

export default function Quote({ text, author, authorId }: QuoteProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <p className="text-lg font-medium text-gray-900">"{text}"</p>
      {authorId ? (
        <Link href={`/authors/${authorId}`} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
          - {author}
        </Link>
      ) : (
        <p className="mt-2 text-sm text-gray-500">- {author}</p>
      )}
    </div>
  )
}

