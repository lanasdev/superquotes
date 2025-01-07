import { getQuotes } from "@/lib/quotes";
import SectionContainer from "@/components/SectionContainer";
import Link from "next/link";
import QuoteComponent from "@/components/Quote";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAuthorImageUrl } from "@/lib/authors";

export default async function QuotesPage() {
  const quotes = await getQuotes()

  // Hole die Autor-Bilder
  const quotesWithImages = await Promise.all(
    quotes.map(async (quote) => ({
      ...quote,
      author_image: quote.author_slug ? await getAuthorImageUrl(quote.author_slug) : null
    }))
  )
  return (
    <SectionContainer className="py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Alle Zitate
        </h1>
        <p className="text-muted-foreground mt-2">
          Entdecke inspirierende Zitate von bemerkenswerten Persönlichkeiten
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {quotes.map((quote) => (
          <Card key={quote.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <QuoteComponent
                text={quote.text}
                author={quote.author}
                author_slug={quote.author_slug || ""}
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
    </SectionContainer>
  );
}
