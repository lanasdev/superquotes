import QuoteList from "../components/QuoteList";
import SectionContainer from "@/components/SectionContainer";
import { SubmitQuoteForm } from "@/components/submit-quote-form";
import { getAuthorImageUrl } from "@/lib/authors";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: authors, error } = await supabase
  .from('authors')
  .select("*")
  .order('slug')

if (error) {
  console.error('Error fetching authors:', error)
  return <div>Error loading authors</div>
}

const authorsWithImages = await Promise.all(
  authors.map(async (author) => ({
    ...author,
    author_image: author.slug ? await getAuthorImageUrl(author.slug) : null
  }))
)

  return (
    <SectionContainer className="py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Famous Quotes Platform
        </h1>
        <p className="text-muted-foreground mt-2">
          Teile und entdecke inspirierende Zitate von bemerkenswerten
          Persönlichkeiten
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
      <SubmitQuoteForm authors={authorsWithImages} />

        <div className="space-y-6">
          <QuoteList />
        </div>
      </div>
    </SectionContainer>
  );
}
