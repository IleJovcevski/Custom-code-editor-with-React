import { CellType } from "../enums";
import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunction = `
          import _React from 'react';
          import _ReactDOM from 'react-dom';
          var show = (value) => {
            const root = document.querySelector('#root');
            if (typeof value === 'object') {
              if (value.$$typeof && value.props) {
                _ReactDOM.render(value, root);
              } else {
                root.innerHTML = JSON.stringify(value);
              }
            } else {
              root.innerHTML = value
            }
          }
          `;

    const showFunctionNoOp = "var show = ()=> {}";

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === CellType.CODE) {
        if (c.id === cellId) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
