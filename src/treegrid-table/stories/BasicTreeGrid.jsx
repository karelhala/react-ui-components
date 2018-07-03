import React, { Component } from 'react';
import TreeGrid from '../components/TreeGridTable';
import '../styles.scss';
import { rows } from '../data/small-flat-grid';
import { tableColumns } from '../data/small-header';
import { defaultRowValues, setVisibleChildren } from '../utils';

class BasictreeGrid extends Component {
  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    this.state = {
      rows: defaultRowValues(rows),
    };
  }

  onRowClick(rowIndex) {
    this.state.rows[rowIndex].collapsed = !this.state.rows[rowIndex].collapsed;
    setVisibleChildren(rowIndex, this.state.rows, this.state.rows[rowIndex].collapsed);
    this.setState(this.state);
  }

  render() {
    return (
      <TreeGrid columns={tableColumns} rows={this.state.rows} onCellClick={this.onRowClick} />
    );
  }
}

export default () => <BasictreeGrid />;
