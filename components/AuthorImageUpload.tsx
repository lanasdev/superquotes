'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadAuthorImage } from '@/lib/authors'
import { ImagePlus, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/app/contexts/AuthContext'

interface AuthorImageUploadProps {
  authorName: string
  authorSlug: string
  currentImageUrl?: string | null
  onImageUpdated?: (newImageUrl: string) => void
}

export default function AuthorImageUpload({ 
  authorName, 
  authorSlug, 
  currentImageUrl,
  onImageUpdated 
}: AuthorImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const { user } = useAuth()

  if (!user) {
    return (
      <div className="text-red-500">
        Sie müssen angemeldet sein, um ein Bild hochzuladen.
      </div>
    )
  }



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Prüfe Dateityp
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie eine Bilddatei aus.",
        variant: "destructive"
      })
      return
    }

    // Prüfe Dateigröße (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      toast({
        title: "Fehler",
        description: "Das Bild darf nicht größer als 8MB sein.",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)
    try {
      // Lade das Bild hoch und aktualisiere die Datenbank
      const imageUrl = await uploadAuthorImage(file, authorSlug)
      if (!imageUrl) throw new Error('Upload fehlgeschlagen')

      // Benachrichtige den Parent über die Änderung
      onImageUpdated?.(imageUrl)

      toast({
        title: "Erfolg",
        description: "Das Profilbild wurde erfolgreich aktualisiert.",
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Fehler",
        description: "Beim Hochladen des Bildes ist ein Fehler aufgetreten.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={currentImageUrl || undefined} alt={authorName} />
          <AvatarFallback className="text-lg">{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="font-medium">{authorName}</h3>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              className="max-w-[200px]"
              disabled={isUploading}
              onChange={handleFileChange}
            />
            {isUploading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Empfohlen: Quadratisches Bild, max. 8MB
          </p>
        </div>
      </div>
    </div>
  )
} 