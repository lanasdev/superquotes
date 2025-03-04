"use client";

import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  User,
  LogIn,
  Book,
  LogOut,
  Quote as QuoteIcon,
  DicesIcon,
} from "lucide-react";
import SectionContainer from "@/components/SectionContainer";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <SectionContainer>
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                Superquotes
              </span>
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link
                href="/q"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <QuoteIcon className="h-5 w-5 mr-1" />
                Quotes
              </Link>
              <Link
                href="/authors"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <Book className="h-5 w-5 mr-1" />
                Authors
              </Link>

              <Link
                href="/random"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <DicesIcon className="h-5 w-5 mr-1" />
                Random
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.email}</span>
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </SectionContainer>
    </nav>
  );
}
