import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface QuoteProps {
  text: string
  author: string
  author_slug: string
  author_image?: string | null
}

export default function Quote({ text, author, author_slug, author_image }: QuoteProps) {
  return (
    <div>
      <p className="text-lg font-medium text-gray-900">"{text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author_image || undefined} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        {author_slug ? (
          <Link href={`/authors/${author_slug}`} className="text-sm text-indigo-600 hover:text-indigo-800">
            {author}
          </Link>
        ) : (
          <p className="text-sm text-gray-500">{author}</p>
        )}
      </div>
    </div>
  )
}

