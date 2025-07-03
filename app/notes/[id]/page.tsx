import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

//Types--------------------------------------------

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

//Metadata----------------------------------------

export const generateMetadata = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const { title, content } = await fetchNoteById(Number(id));
  const snippet = content.length > 30 ? content.slice(0, 30) + "..." : content;

  return {
    title: title || "Note details",
    description: snippet,

    openGraph: {
      title: title || "Note details",
      description: snippet,
      url: `https://08-zustand-psi.vercel.app/filter/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Note details",
      description: snippet,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
};

//Component--------------------------------------------

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
