import { Fragment, useRef, useState } from "react";
import { StickyNotesTypes } from "../App";
import ChangeColorModel from "../model/ChangeColorModel";

type DropAreaProps = {
  stickyNotes: StickyNotesTypes[];
  deleteNote: Function;
  updateNote: Function;
  updateColor: Function;
};

const DropArea = ({
  stickyNotes,
  deleteNote,
  updateNote,
  updateColor,
}: DropAreaProps) => {

  let dragid: number;
  const prevID = useRef<string>();
  const [colorModel, setColorModel] = useState(false);
  const [clickId, setClickId] = useState(1);

  // the drag reason the note will be drag and drop
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  // to make selected note on the top
  const updatezIndex = (id: string) => {
    if (prevID.current) {
      const removeIndex = document.getElementById(prevID.current)!;
      removeIndex.style.zIndex = "1";
    }
    prevID.current = id;
    const item = document.getElementById(id)!;
    item.style.zIndex = "5";
  };


  // listen for double click events for showing the color change model 
  const handleClick: React.MouseEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    setClickId(+e.currentTarget.id);
    const item = document.getElementById(
      e.currentTarget.id
    )! as HTMLTextAreaElement;
    item.addEventListener("dblclick", () => {
      setColorModel(true);
    });
    if (e.currentTarget.id) {
      updatezIndex(e.currentTarget.id);
    }
  };

  // up on drop it takes the new position and update the array 
  const handleDragEnd: React.DragEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();

    //not working with typescript
    e.dataTransfer.setData("text/plain", e.currentTarget.id);

    const item = document.getElementById(
      e.currentTarget.id
    )! as HTMLTextAreaElement;
    item.style.left = e.clientX + "px";
    item.style.top = e.clientY + "px";
    const numberId: number = +e.currentTarget.id;
    updateNote(numberId, e.clientX, e.clientY, +item.rows, +item.cols);
  };

  // set drag id for frop zone as DragEvent.dataTransfer is not working 
  const handleDrag: React.DragEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    dragid = +e.currentTarget.id;
  };

  //i was not able to use DragEvent.dataTransfer
  const assignData = () => {
    if (dragid) deleteNote(dragid);
    prevID.current = "1";
  };

  return (
    <div className="dragArea" onDragOver={handleDragOver}>
      {stickyNotes &&
        stickyNotes.map((note: StickyNotesTypes) => {
          return (
            <Fragment>
              <textarea
                draggable
                style={{
                  left: note.x,
                  top: note.y,
                  backgroundColor: note.color,
                }}
                onClick={handleClick}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                key={note.id}
                id={note.id.toString()}
                className="draggable-textarea"
                rows={10}
                cols={30}
              ></textarea>
              {colorModel && clickId && (
                <ChangeColorModel
                  id={clickId}
                  updateColor={updateColor}
                  setColorModel={setColorModel}
                />
              )}
            </Fragment>
          );
        })}
      <div onDragOver={assignData} className="drop-zone">
        Drag here to delete
      </div>
    </div>
  );
};
export default DropArea;
