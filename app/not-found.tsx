import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Not Found</h2>
        <p className="text-gray-600 text-lg mb-6">Could not find requested resource</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}