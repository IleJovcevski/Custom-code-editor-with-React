import { useTypedSelector } from "../hooks/use-typed-selector";

const CellList: React.FC = () => {
  useTypedSelector((state) => state);

  return (
    <div>
      List of cells
      <li></li>
    </div>
  );
};

export default CellList;
