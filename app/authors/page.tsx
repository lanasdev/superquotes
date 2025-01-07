import Link from 'next/link'
import { getAuthors } from "@/lib/authors"
import SectionContainer from "@/components/SectionContainer"

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <SectionContainer className="py-8">
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {authors.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
            {author.bio && <p className="text-gray-600">{author.bio.substring(0, 100)}...</p>}
          </Link>
        ))}
      </div>
    </SectionContainer>
  )
}

