import React, {useEffect, useState} from "react";
import * as Icons from "../../../../Icons/Icons";

function FilterOption(props) {

  const {
    selectedFilter,
    selectedOption,
    selectOption,
    getOptionName,
    changeOption,
  } = props;

  const [filter, setFilter] = useState(selectedFilter.length ? selectedFilter : []);

  useEffect(() => {
    setFilter(prevState => {
      prevState !== selectedFilter ? selectedFilter : prevState
    })
  }, [selectedFilter]);

  return (
    <div className="filter-option">
      <button
        type="button"
        className="dropdown-toggle dropdown-button"
        data-toggle="dropdown"
      >
        {getOptionName(selectedOption)}
        <Icons.Arrow />
      </button>
      <div className="dropdown-menu">
        {selectedFilter && selectedFilter.length ?
        (selectedFilter[0] === "select") ? 
        selectedFilter.map((option, index) => 
            <a
              className="dropdown-item"
              key={index}
              onClick={() => selectOption(option)}
            >
              {getOptionName(option)}
            </a>
        ) :
        (
          selectedFilter.push(selectedOption),
          selectedFilter.map((option, index) => 
              <a
                className="dropdown-item"
                key={index}
                onClick={() => changeOption(option, selectedOption)}
              >
                {getOptionName(option)}
              </a>
            )
        ) 
          : null
        }
      </div>
    </div>
  );
}

export default FilterOption;
