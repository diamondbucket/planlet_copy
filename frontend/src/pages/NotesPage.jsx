import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const [notes, setNotes] = useState([]); // Array of notes
  const [selectedDate, setSelectedDate] = useState(""); // Format: YYYY-MM-DD
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  // Fetch all notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          // Handle unauthorized access or other errors
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        navigate("/login");
      }
    };

    fetchNotes();
  }, [navigate]);

  // Handle selection of a date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const existingNote = notes.find(
      (note) => new Date(note.date).toISOString().split("T")[0] === date
    );
    if (existingNote) {
      setNoteContent(existingNote.content);
    } else {
      setNoteContent("");
    }
  };

  // Handle saving a note
  const handleSaveNote = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${selectedDate}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: noteContent }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update notes state
        setNotes((prevNotes) => {
          const otherNotes = prevNotes.filter(
            (note) =>
              new Date(note.date).toISOString().split("T")[0] !== selectedDate
          );
          return [...otherNotes, data.note];
        });
        alert("Note saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("An error occurred while saving the note.");
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const note = notes.find(
      (note) => new Date(note.date).toISOString().split("T")[0] === selectedDate
    );

    if (!note) {
      alert("No note to delete for the selected date.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Update notes state
        setNotes((prevNotes) =>
          prevNotes.filter((n) => n._id !== note._id)
        );
        setNoteContent("");
        alert("Note deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting the note.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Your Notes</h1>
      
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
        {/* Date Picker */}
        <div className="mb-6">
          <label htmlFor="date" className="block text-white mb-2">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Note Content */}
        {selectedDate && (
          <div className="mb-6">
            <label htmlFor="note" className="block text-white mb-2">
              Your Note:
            </label>
            <textarea
              id="note"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows="5"
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your notes here..."
            ></textarea>
          </div>
        )}

        {/* Action Buttons */}
        {selectedDate && (
          <div className="flex justify-between">
            <button
              onClick={handleSaveNote}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              Save Note
            </button>
            <button
              onClick={handleDeleteNote}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              Delete Note
            </button>
          </div>
        )}
      </div>

      {/* Display Notes */}
      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">All Your Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.length === 0 ? (
            <p className="text-white">No notes available. Add some!</p>
          ) : (
            notes.map((note) => {
              const noteDate = new Date(note.date).toISOString().split("T")[0];
              return (
                <div
                  key={note._id}
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 shadow-xl"
                >
                  <p className="text-white text-sm font-medium mb-2">
                    Date: {noteDate}
                  </p>
                  <p className="text-white">{note.content}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage; 