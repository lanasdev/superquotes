import Link from "next/link";
import { getAuthors } from "@/lib/authors";
import SectionContainer from "@/components/SectionContainer";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <SectionContainer className="py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Authors
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore our collection of authors
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {authors.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
            {author.bio && (
              <p className="text-gray-600">{author.bio.substring(0, 100)}...</p>
            )}
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
