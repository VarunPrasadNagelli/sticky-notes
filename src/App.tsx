import React, { useState } from "react";
import DropArea from "./components/DropArea";
import NavBar from "./components/NavBar";
import "./index.css";
import NewModel from "./model/NewModel";

export type StickyNotesTypes = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

function App() {
  const [stickyNotes, setStickyNotes] = useState<StickyNotesTypes[]>([]);

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setStickyNotes((updateNote): StickyNotesTypes[] => [
      ...updateNote,
      {
        id: 1 + updateNote.length,
        x: 10,
        y: 10,
        w: 200,
        h: 200,
        color: "yellow",
      },
    ]);
  };

  const createCustom = (x = 10, y = 10, w = 200, h = 200, color = "yellow") => {
    setStickyNotes((updateNote): StickyNotesTypes[] => [
      ...updateNote,
      {
        id: 1 + updateNote.length,
        x,
        y,
        w,
        h,
        color,
      },
    ]);
  };

  //i was not able to use DragEvent.dataTransfer
  const deleteNote = (removeId: number) => {
    setStickyNotes((prevNote) =>
      prevNote.filter((item) => item.id !== removeId)
    );
  };

  const updateColor = (id: number, color: string) => {
    setStickyNotes((prevNote) =>
      prevNote.map((item) => {
        if (item.id === id) {
          return { ...item, color };
        } else {
          return { ...item };
        }
      })
    );
  };

  const updateNote = (
    id: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    setStickyNotes((prevNote) =>
      prevNote.map((item) => {
        if (item.id === id) {
          return { ...item, id, x, y, w, h };
        } else {
          return { ...item };
        }
      })
    );
  };

  return (
    <div className="App">
      <NavBar handleAdd={handleAdd} />
      <NewModel createCustom={createCustom} />
      <DropArea
        stickyNotes={stickyNotes}
        deleteNote={deleteNote}
        updateNote={updateNote}
        updateColor={updateColor}
      />
    </div>
  );
}

export default App;
