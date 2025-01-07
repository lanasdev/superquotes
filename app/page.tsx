import QuoteList from "../components/QuoteList";
import QuoteForm from "../components/QuoteForm";
import SectionContainer from "@/components/SectionContainer";

export default function Home() {
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
        <QuoteForm />

        <div className="space-y-6">
          <QuoteList />
        </div>
      </div>
    </SectionContainer>
  );
}
