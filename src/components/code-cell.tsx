import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import bundle from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  //user will not be able to use local storage or cookies with this app
  const [error, setError] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    //setting up debouncer for bundler
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    //cleanup Fn for the timer
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <Preview bundledCode={code} bundleError={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
