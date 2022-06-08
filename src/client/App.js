import { useState, useEffect } from "react";

const App = () => {
  // State
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [updateId, setUpdateId] = useState(null);

  // Hooks
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/notes");
      const data = await res.json();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  // Helpers
  const createNote = (event) => {
    event.preventDefault();
    if (!input) return;

    (async () => {
      const res = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });
      const data = await res.json();
      setNotes([...notes, data]);
      setInput("");
    })();
  };

  const updateNote = (event) => {
    event.preventDefault();
    if (!input) {
      setUpdateId(null);
    } else {
      (async () => {
        const res = await fetch(`/notes/${updateId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: input }),
        });
        const data = await res.json();
        setNotes(notes.map((note) => (note.id === updateId ? data : note)));
        setInput("");
        setUpdateId(null);
      })();
    }
  };

  const deleteNote = (id) => {
    (async () => {
      await fetch(`/notes/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== id));
    })();
  };

  // Action Handlers
  const handleFormSubmit = updateId ? updateNote : createNote;

  const handleClickUpdateButton = (note) => {
    setUpdateId(note.id);
    setInput(note.content);
  };

  const handleClickCancelButton = () => {
    setUpdateId(null);
    setInput("");
  };

  return (
    <div>
      <h1>Notes App</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          {updateId ? "update note:" : "add note:"}{" "}
          <input
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
          <button type="submit">{updateId ? "update" : "save"}</button>
          {updateId && (
            <button type="button" onClick={handleClickCancelButton}>
              cancel
            </button>
          )}
        </form>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button type="button" onClick={() => handleClickUpdateButton(note)}>
              update
            </button>
            <button type="button" onClick={() => deleteNote(note.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
