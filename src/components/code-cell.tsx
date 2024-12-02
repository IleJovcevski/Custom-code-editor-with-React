import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //user will not be able to use local storage or cookies with this app
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  console.log("bundle: ", bundle);

  useEffect(() => {
    //setting up debouncer for bundler
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    //cleanup Fn for the timer
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        {bundle && (
          <Preview bundledCode={bundle.code} bundleError={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
