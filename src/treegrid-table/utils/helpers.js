import { fixOrder, getChildren, getImmediateChildren } from 'treetabular';

export function setVisibleChildren(rowIndex, rows, defaultCollapsed = true) {
  let children;
  if (rows[rowIndex].collapsed === true) {
    children = getChildren({ index: rowIndex })(rows);
  } else {
    children = getImmediateChildren({ index: rowIndex })(rows);
  }
  children.forEach((oneRow) => {
    oneRow.collapsed = defaultCollapsed;
    oneRow.visible = !oneRow.collapsed;
  });

  return children;
}

export function defaultRowValues(tableRows) {
  const rows = fixOrder()(tableRows);
  return rows
    .map((oneRow, key) => {
      oneRow._index = key;
      oneRow.visible = !(oneRow.visible === false);
      oneRow.collapsed = oneRow.collapsed === true;
      if (oneRow.collapsed) {
        setVisibleChildren(key, rows, oneRow.collapsed);
      }
      return oneRow;
    });
}

export function getShowingChildren({ rowData }) {
  console.log('here');
  if (rowData.collapsed !== undefined) {
    return !rowData.collapsed;
  }
  return true;
}
