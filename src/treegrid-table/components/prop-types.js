import PropTypes from 'prop-types';
import { getShowingChildren } from '../utils/helpers';

export const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    property: PropTypes.string.isRequired,
    header: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    visible: PropTypes.bool,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent: PropTypes.number,
    collapsed: PropTypes.bool,
  })).isRequired,
  config: PropTypes.shape({
    showIcon: PropTypes.bool,
    toggleEvent: PropTypes.string,
    additionalProps: PropTypes.any,
  }),
  onCellClick: PropTypes.func,
  getShowingChildren: PropTypes.func,
};

export const defaultProps = {
  config: {
    showIcon: false,
  },
  onCellClick: () => undefined,
  getShowingChildren,
};
