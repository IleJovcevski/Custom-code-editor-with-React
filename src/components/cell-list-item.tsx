import "./cell-list-item.css";
import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import { CellType } from "../enums";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  cell.type === CellType.CODE
    ? (child = (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ))
    : (child = (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      ));
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
