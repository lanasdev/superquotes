import { notFound } from 'next/navigation'
import { getAuthorBySlug, getAuthors, getQuotesByAuthorSlug } from '@/lib/authors'
import Quote from '../../../components/Quote'
import { Suspense } from 'react'

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const authorSlug = (await params).slug
  const author = await getAuthorBySlug(authorSlug)
  const quotes = await getQuotesByAuthorSlug(authorSlug)

  // if (!author) {
  //   return <div className=''>Wir konnten leider den Author nicht finden</div>
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
        {author.bio && <p className="text-gray-600 mb-6">{author.bio}</p>}
        <h2 className="text-2xl font-semibold mb-4">Quotes</h2>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Quote key={quote.id} text={quote.text} author={author.name} author_slug={authorSlug} />
          ))}
        </div>
      </div>
    </div>
  )
}


export async function generateStaticParams() {
  const authors = await getAuthors()
 
  return authors.map(author => ({
    slug: author.slug,
  }))
}