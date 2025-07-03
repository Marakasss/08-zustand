import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Tag } from "@/types/note";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

//Metadata----------------------------------------

export const generateMetadata = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug.length > 0 && slug[0] !== "All" ? (slug[0] as Tag) : "All";

  return {
    title: tag === "All" ? "All notes" : `${tag} notes`,
    description:
      tag === "All" ? "All notes collection" : `Notes relating to ${tag}`,

    openGraph: {
      title: tag === "All" ? "All notes" : `${tag} notes`,
      description:
        tag === "All" ? "All notes collection" : `Notes relating to ${tag}`,

      url: `https://08-zustand-psi.vercel.app/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tag === "All" ? "All notes" : `${tag} notes`,
      description:
        tag === "All" ? "All notes collection" : `Notes relating to ${tag}`,

      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
};

//-------------------------------------------------------

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag =
    slug.length > 0 && slug[0] !== "All" ? (slug[0] as Tag) : undefined;
  const initialNotesData = await fetchNotes("", 1, tag);

  return <NotesClient initialNotesData={initialNotesData} tag={tag} />;
};
export default Notes;
