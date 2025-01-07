import { supabase } from "./supabase";

export interface Author {
  name: string;
  slug: string;
  bio: string | null;
  image_url?: string | null;
  created_at?: string | null;
  id: number;
}

export async function getAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching authors:", error);
    return [];
  }

  // Füge die Bild-URLs hinzu
  const authorsWithImages = await Promise.all(
    data.map(async (author) => {
      const imageUrl = await getAuthorImageUrl(author.slug);
      return {
        ...author,
        image_url: imageUrl,
      };
    })
  );

  return authorsWithImages;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching author:", error);
    return null;
  }

  // Füge die Bild-URL hinzu
  // const imageUrl = await getAuthorImageUrl(slug);
  // return {
  //   ...data,
  //   image_url: imageUrl,
  // };

  return data
}

export async function getQuotesByAuthorSlug(slug: string) {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("author_slug", slug);

  if (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }

  return data;
}

export async function uploadAuthorImage(
  file: File,
  authorSlug: string
): Promise<string | null> {
  try {
    // Bestimme die Dateiendung
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${authorSlug}.${extension}`;

    // Upload zur Storage
    const { error: uploadError } = await supabase.storage
      .from("authors")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Error uploading to storage:", uploadError);
      return null;
    }

    // Hole die öffentliche URL
    const { data } = await supabase.storage.from("authors").getPublicUrl(path);

    if (!data?.publicUrl) {
      console.error("Could not get public URL");
      return null;
    }

    // Speichere den Dateinamen (nicht die volle URL) in der Datenbank
    const success = await updateAuthorImage(authorSlug, path);
    if (!success) {
      console.error("Could not update author image path");
      return null;
    }

    return data.publicUrl;
  } catch (error) {
    console.error("Error in uploadAuthorImage:", error);
    return null;
  }
}

export async function getAuthorImageUrl(
  authorSlug: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("authors")
    .select("image_url")
    .eq("slug", authorSlug)
    .single();

  if (error || !data) {
    console.error("Fehler beim Abrufen der Autoreninformationen:", error?.message);
    return null;
  }


  const { data: publicUrlData } = await supabase.storage
    .from("authors")
    .getPublicUrl(data.image_url);

  if (!publicUrlData?.publicUrl) {
    console.error("Fehler beim Abrufen der öffentlichen URL.");
    return null;
  }

  return publicUrlData.publicUrl;
}

export async function updateAuthorImage(
  authorSlug: string,
  imageUrl: string
): Promise<boolean> {
  const { error } = await supabase
    .from("authors")
    .update({
      image_url: imageUrl,
      updated_at: new Date().toISOString()
    })
    .eq("slug", authorSlug);

  if (error) {
    console.error("Error updating author image:", error);
    return false;
  }

  return true;
}
