'use client'

import { useAuth } from '../app/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign Out
    </button>
  )
}

