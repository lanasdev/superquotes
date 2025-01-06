'use client'

import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import QuoteList from './components/QuoteList'
import QuoteForm from './components/QuoteForm'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'

function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Famous Quotes Platform</h1>
        <div className="max-w-2xl mx-auto">
          {user ? <QuoteForm /> : <LoginForm />}
          <QuoteList />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

