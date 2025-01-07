import Quote from './Quote'
import { getQuotesForHome } from '@/lib/quotes'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getAuthorImageUrl } from '@/lib/authors'

export default async function QuoteList() {
  const quotes = await getQuotesForHome()

  // Hole die Autor-Bilder
  const quotesWithImages = await Promise.all(
    quotes.map(async (quote) => ({
      ...quote,
      author_image: quote.author_slug ? await getAuthorImageUrl(quote.author_slug) : null
    }))
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Neueste Zitate</h2>
      {quotesWithImages.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Noch keine Zitate vorhanden.</p>
            <Button asChild className="mt-4">
              <Link href="/login">Erstelle das erste Zitat</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {quotesWithImages.map((quote) => (
            <Card key={quote.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Quote 
                  text={quote.text} 
                  author={quote.author} 
                  author_slug={quote.author_slug || ''} 
                  author_image={quote.author_image}
                />
              </CardContent>
              <CardFooter className="justify-end py-4 border-t">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/q/${quote.id}`}>
                    Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
