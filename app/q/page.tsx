import { getQuotes } from "@/lib/quotes";
import SectionContainer from "@/components/SectionContainer";
import Link from "next/link";
import QuoteComponent from "@/components/Quote";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function QuotesPage() {
  const quotes = await getQuotes();

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
