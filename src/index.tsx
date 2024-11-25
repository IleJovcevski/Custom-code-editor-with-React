import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
//import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element);
root.render(<App />);
