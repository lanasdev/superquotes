import { notFound } from 'next/navigation'
import { getQuoteById, getQuotes } from '@/lib/quotes'
import SectionContainer from '@/components/SectionContainer'
import Link from 'next/link'
import QuoteComponent from '@/components/Quote'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function QuotePage({
    params,
}: {
  params: Promise<{ id: string }>
}) {
  const quote = await getQuoteById((await params).id)

  if (!quote) {
    notFound()
  }

  return (
    <SectionContainer className="py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <QuoteComponent 
              text={quote.text} 
              author={quote.author_name || quote.author} 
              author_slug={quote.author_slug || ''} 
            />
          </CardContent>
          <CardFooter className="justify-start py-4 border-t">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/q">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Zurück zu allen Zitaten
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  )
}

export async function generateStaticParams() {
  const quotes = await getQuotes()
 
  return quotes.map(quote => ({
    id: quote.id.toString(),
  }))
} 