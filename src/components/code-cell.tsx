import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./code-preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState("");
  //user will not be able to use local storage or cookies with this app
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //setting up debouncer for bundler
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    //cleanup Fn for the timer
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview bundledCode={code} bundleError={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
