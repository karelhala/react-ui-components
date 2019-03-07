import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { __ } from '../../../global-functions';
import TaggingPropTypes from '../TaggingPropTypes';

class TagSelector extends React.Component {
  handleChange = (selectedOption) => {
    this.props.onTagCategoryChange({
      id: selectedOption.value,
      description: this.props.tagCategories.find(category => category.id === selectedOption.value).description,
    });
  };


  labelWithIcon = (description, infoText) => (
    <div>
      <span>{description}</span>
      <span
        className="pull-right pficon pficon-info tag-icon"
        title={infoText}
        aria-hidden="true"
      />
      <span className="sr-only">{infoText}</span>
    </div>
  );

  tagCategories = this.props.tagCategories.map(category => ({
    keyWord: category.description.toLowerCase(),
    value: category.id,
    label: category.singleValue
      ? this.labelWithIcon(category.description, this.props.infoText)
      : category.description,
  }));

  render() {
    const val = { value: this.props.selectedOption.id, label: this.props.selectedOption.description };
    return (
      <Select
        value={val}
        options={this.tagCategories}
        onChange={this.handleChange}
        className="selected-option"
        name="form-field-name"
        filterOptions={(options, filter) =>
          options.filter(item => item.keyWord.includes(filter.toLowerCase()))
        }
        clearable={false}
      />
    );
  }
}
TagSelector.propTypes = {
  tagCategories: PropTypes.arrayOf(TaggingPropTypes.category).isRequired,
  selectedOption: TaggingPropTypes.value,
  onTagCategoryChange: PropTypes.func.isRequired,
  infoText: PropTypes.string,
};

TagSelector.defaultProps = {
  infoText: __('Only a single value can be assigned from these categories'),
  selectedOption: {},
};

export default TagSelector;
