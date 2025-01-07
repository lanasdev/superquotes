import { supabase } from '@/lib/supabase'
import { SubmitQuoteForm } from '@/components/submit-quote-form'


export default async function SubmitQuotePage() {
  const { data: authors, error } = await supabase
    .from('authors')
    .select("*")
    .order('slug')

  if (error) {
    console.error('Error fetching authors:', error)
    return <div>Error loading authors</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Submit a New Quote</h1>
      <SubmitQuoteForm authors={authors} />
    </div>
  )
}

