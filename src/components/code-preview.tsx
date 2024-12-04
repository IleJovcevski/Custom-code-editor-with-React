import { store } from "../state";
import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  bundledCode: string;
  bundleError: string;
}

//setting up event (that comes from the parent) listener to allow communiction with the parent
//and executing it with eval why handling potential errors
const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red"><h4>Runtime error!</h4>' + err + '</div>';
            throw err;
          }
          window.addEventListener('error', (event) => {
            event.preventDefault()
            handleError(event.error)
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err)           
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ bundledCode, bundleError }) => {
  //ref to be asigned to iframe
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(bundledCode, "*");
      console.log("changed state", store.getState());
    }, 50);
  }, [bundledCode]);

  /*allowing communication between parent and iframe, same domain & allow -same-origin*/
  /*<iframe sandbox="allow-same-origin" title="display" src="/test.html" />*/

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        title="iframe display"
        srcDoc={html}
      />
      {bundleError && <div className="preview-error">{bundleError}</div>}
    </div>
  );
};

export default Preview;
