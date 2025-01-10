import { supabase } from "@/lib/supabase";
import SectionContainer from "@/components/SectionContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, DicesIcon } from "lucide-react";
import QuoteComponent from '@/components/Quote'
import { cache } from 'react'
import { notFound } from 'next/navigation'
 

// Make the page dynamic to ensure we get a new random quote on each refresh
export const dynamic = 'force-dynamic'

export const getQuotes = cache(async () => {
  const { data, error } = await supabase.from("quotes").select(
    `
      *,
      authors (
        name,
        slug
      )
    `,
  )

  if (!data) notFound()
  // return data[Math.floor(Math.random() * data.length)];
  return data;
});

export default async function RandomQuotePage() {
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <SectionContainer className="py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Random Quote
        </h1>
        <p className="text-muted-foreground mt-2">
          Get inspired by a random quote
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <QuoteComponent
              text={quote.text} 
              author={quote.author?.name || quote.author} 
              author_slug={quote.author_slug || ''} 
            />
          </CardContent>
          <CardFooter className="justify-between py-4 border-t">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/q">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Quotes
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/random">
                <DicesIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Get Another Quote
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  );
}
