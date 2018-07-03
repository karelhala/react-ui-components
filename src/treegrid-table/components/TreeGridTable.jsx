import React, { Component } from 'react';
import { toggleChildren } from 'treetabular';
import { Table } from 'patternfly-react';

import { propTypes, defaultProps } from './prop-types';
import { hasOwnProperty, getProperty } from '../../utils';
import iconCell from './IconFormatter';

class TreegridTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.columnsFromProps(),
    };
  }

  columnsFromProps() {
    const { columns } = this.props;
    columns[0] = this.applyFormatters(columns[0]);
    return columns;
  }

  applyFormatters(column) {
    return {
      ...column,
      cell: {
        ...getProperty(column, 'cell'),
        formatters: [
          ...(column && hasOwnProperty.call(column, 'cell') && getProperty(column.cell, 'formatters', [])) || [],
          ...[
            iconCell,
            this.treeGridFormatter(),
          ],
        ],
      },
    };
  }

  treeGridFormatter() {
    return toggleChildren({
      getRows: () => this.props.rows,
      getShowingChildren: extra => this.props.getShowingChildren(extra),
      toggleShowingChildren: rowIndex => this.props.onCellClick && this.props.onCellClick(rowIndex),
      props: {
        className: !this.props.config.showIcon && 'no-icon',
        ...this.props.config.additionalProps,
      },
      toggleEvent: this.props.config.toggleEvent || 'Toggle',
    });
  }

  render() {
    const { columns } = this.state;
    const rows = this.props.rows.filter(oneRow => oneRow.visible).map(oneRow => ({ ...oneRow }));
    return (
      <div>
        <Table.Provider
          className="pure-table pure-table-striped tree-grid-table"
          columns={columns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

TreegridTable.propTypes = propTypes;
TreegridTable.defaultProps = defaultProps;

export default TreegridTable;
