import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import React from "react";

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
