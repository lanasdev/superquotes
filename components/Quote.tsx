import Link from 'next/link'

interface QuoteProps {
  text: string
  author: string
  author_slug: string
}

export default function Quote({ text, author, author_slug }: QuoteProps) {

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <p className="text-lg font-medium text-gray-900">"{text}"</p>
      {author_slug ? (
        <Link href={`/authors/${author_slug}`} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">
          - {author}
        </Link>
      ) : (
        <p className="mt-2 text-sm text-gray-500">- {author}</p>
      )}
    </div>
  )
}

