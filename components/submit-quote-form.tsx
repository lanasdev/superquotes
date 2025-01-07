"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { submitQuote, QuoteFormDataProps } from "@/app/actions/submitQuote";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/app/contexts/AuthContext";
import { Loader2, LogIn, Lock as LockIcon } from "lucide-react";
import Link from "next/link";
import { toast, useToast } from "@/components/ui/use-toast";

interface Author {
  slug: string;
  name: string;
  image_url: string;
  author_image?: string | null; // gets passed down if possible
}

interface SubmitQuoteFormProps {
  authors: Author[];
}

export function SubmitQuoteForm({ authors }: SubmitQuoteFormProps) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    const text = formData.get("text");
    if (!text) {
      console.error("Enter Quote and select Author");
    }
    const QuoteFormData: QuoteFormDataProps = {
      text: text as string,
      authorSlug: value,
    };
    if (!QuoteFormData.authorSlug) {
      console.error("Enter Quote and select Author");
    }
    const result = await submitQuote(QuoteFormData);
    setLoading(false);
    toast({
      title: "Success!",
      description: "Your quote has been submitted.",
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
      // Reset form
      formData.set("text", "");
      setValue("");
    }
  };

  return (
    <Suspense fallback={<SubmitQuoteFormSkeleton />}>
      {user ? (
        <form
          action={handleSubmit}
          className="space-y-4 mb-8 bg-white shadow-md rounded-lg p-6"
        >
          <div>
            <Label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Quote
            </Label>
            <Textarea
              id="text"
              name="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <Label htmlFor="authorSlug">Author</Label>
            {/* <Input name="authorSlug" /> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    {value && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={
                            authors.find((author) => author.slug === value)
                              ?.author_image || undefined
                          }
                          alt={
                            authors.find((author) => author.slug === value)
                              ?.slug || ""
                          }
                          className="h-full w-6 object-cover aspect-square rounded-full"
                        />
                        <AvatarFallback className="text-xs object-cover aspect-square rounded-full">
                          {authors
                            .find((author) => author.slug === value)
                            ?.slug.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {value
                      ? authors.find((author) => author.slug === value)?.name
                      : "Select author..."}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search author..." />
                  <CommandEmpty>No author found.</CommandEmpty>
                  <CommandGroup>
                    {authors.map((author) => (
                      <CommandItem
                        key={author.slug}
                        onSelect={() => {
                          setValue(author.slug === value ? "" : author.slug);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={author.author_image || undefined}
                            alt={author.name}
                            className="h-full w-6 object-cover aspect-square rounded-full"
                          />
                          <AvatarFallback className="text-xs object-cover aspect-square rounded-full">
                            {author.name?.charAt(0) || "A"}
                          </AvatarFallback>
                        </Avatar>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === author.slug ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {author.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <input type="hidden" name="authorId" value={value} />

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Quote"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      ) : (
        <LoginNotice />
      )}
    </Suspense>
  );
}

const SubmitQuoteFormSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 p-6 bg-white shadow-md rounded-lg">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>

      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const LoginNotice: React.FC = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg w-full">
          <LockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Login Required
          </h3>
          <p className="text-gray-600 mb-4">
            Please sign in to share your favorite quotes with the community.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

function getAuthorImageUrl(slug: string): any {
  throw new Error("Function not implemented.");
}
