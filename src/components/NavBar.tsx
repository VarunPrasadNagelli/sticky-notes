import React from "react";

type NavBarProps = {
  handleAdd: React.MouseEventHandler<HTMLButtonElement>;
};

const NavBar = ({ handleAdd }: NavBarProps) => {
  return (
    <div className="nav">
      <p>Right click on the screen to get more setting</p>
      <p>bouble click on the notes change color</p>
      <button className="add-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
export default NavBar;
