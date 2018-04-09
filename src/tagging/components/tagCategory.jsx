import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import './tagCategory.scss';

class TagCategory extends React.Component {
  generateTag = tagValue =>
    (<Tag
      key={tagValue.id}
      tagCategory={this.props.tagCategory}
      tagValue={tagValue}
      onTagDeleteClick={this.props.onTagDeleteClick}
    />);

  render() {
    return (
      <ul className="tag-category list-inline">
        {this.props.tagCategory.description}:
        {this.props.tagValues.map(tagValue => this.generateTag(tagValue))}
      </ul>
    );
  }
}

TagCategory.propTypes = {
  onTagDeleteClick: PropTypes.func.isRequired,
  tagCategory: PropTypes.object.isRequired,
  tagValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagCategory;
