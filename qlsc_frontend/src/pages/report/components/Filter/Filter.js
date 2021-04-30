import React from 'react';

import FilterByDate from './FilterByDate/FilterByDate';

function Filter() {
  return (
    <div className="d-flex flex-wrap align-items-center">
      <FilterByDate />
    </div>
  );
}

export default React.memo(Filter);
