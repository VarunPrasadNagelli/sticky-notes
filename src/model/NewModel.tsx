import { useState } from "react";

const NewModel = ({ createCustom }: any) => {
  const [row, setRow] = useState<number>();
  const [col, setCol] = useState<number>();
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();
  const [color, setColor] = useState<string>();

  window.oncontextmenu = function (e: MouseEvent) {
    setX(+e.clientX);
    setY(+e.clientY);
    e.preventDefault();
    (document.getElementById("new-model") as HTMLDivElement).style.visibility =
      "visible";
  };

  const handleRow: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRow(+e.target.value);
  };
  const handleCol: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCol(+e.target.value);
  };

  const handleClick = () => {
    console.log(x, y);
    createCustom(x, y, row, col, color);
    (document.getElementById("new-model") as HTMLDivElement).style.visibility =
      "hidden";
  };
  const handleColor: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setColor(e.target.value);
  };

  return (
    <div id="new-model">
      <select onChange={handleColor} id="colors">
        <option value="yellow">yellow</option>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="blue">blue</option>
      </select>
      <br></br>
      <input
        onChange={handleRow}
        type="number"
        min="10"
        max="100"
        value={row}
        placeholder="Enter the row size"
      ></input>
      <br></br>
      <input
        onChange={handleCol}
        type="number"
        min="10"
        max="100"
        value={col}
        placeholder="Enter the column size"
      ></input>
      <br></br>

      <button onClick={handleClick}>Create</button>
    </div>
  );
};
export default NewModel;
