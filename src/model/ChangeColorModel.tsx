type ChangeColorModelProps = {
  id: number;
  setColorModel: Function;
  updateColor: Function;
};

//change the color of note by double clicking 
const ChangeColorModel: React.FC<ChangeColorModelProps> = ({
  id,
  setColorModel,
  updateColor,
}) => {
  const handleColor: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    updateColor(id, e.target.value);
    setColorModel(false);
  };
  return (
    <div id="change-color">
      <select onChange={handleColor} id={id + "colors"}>
        <option value="yellow">select color</option>
        <option value="yellow">yellow</option>
        <option value="red">red</option>
        <option value="green">green</option>
        <option value="blue">blue</option>
      </select>
    </div>
  );
};
export default ChangeColorModel;
