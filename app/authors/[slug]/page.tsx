import { notFound } from 'next/navigation'
import { getAuthorBySlug, getAuthorImageUrl, getAuthors, getQuotesByAuthorSlug } from '@/lib/authors'
import Quote from '../../../components/Quote'
import { Suspense } from 'react'
import SectionContainer from '@/components/SectionContainer'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AuthorImageUpload from '@/components/AuthorImageUpload'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export const revalidate = 10

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const authorSlug = (await params).slug
  const author = await getAuthorBySlug(authorSlug)
  const quotes = await getQuotesByAuthorSlug(authorSlug)

  if (!author) {
    notFound()
  }

  console.log(author)

  const ImageUrl = author.slug ? await getAuthorImageUrl(author.slug) : null
  console.log(ImageUrl)


  return (
    <SectionContainer className="py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            {author.image_url && ImageUrl && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={ImageUrl}
                  alt={author.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            <AuthorImageUpload 
              authorName={author.name}
              authorSlug={author.slug}
              currentImageUrl={ImageUrl}
            />
          </CardHeader>
          <CardContent>
            {author.bio && <p className="text-gray-600 mb-6">{author.bio}</p>}
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Zitate</h2>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Quote 
                  text={quote.text} 
                  author={author.name} 
                  author_slug={author.slug}
                  author_image={ImageUrl} 
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export async function generateStaticParams() {
  const authors = await getAuthors()
 
  return authors.map(author => ({
    slug: author.slug,
  }))
}