import QuoteList from "../components/QuoteList";
import QuoteForm from "../components/QuoteForm";
import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">
        Famous Quotes Platform
      </h1>
      <div className="max-w-2xl mx-auto">
        {/* {user ? <QuoteForm /> : <LoginForm />} */}
        <QuoteForm />
        <QuoteList />
      </div>
    </div>
  );
}

