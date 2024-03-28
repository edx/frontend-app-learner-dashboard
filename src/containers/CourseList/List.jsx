import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import {
  ActiveCourseFilters,
} from 'containers/CourseFilterControls';
import CourseCard from 'containers/CourseCard';

import { useIsCollapsed } from './hooks';

// TODO: name this component CourseList?
export const List = ({
  filterOptions, setPageNumber, numPages, showFilters, visibleList,
}) => {
  const isCollapsed = useIsCollapsed();
  return (
    <>
      {showFilters && (
        <div id="course-list-active-filters-container">
          <ActiveCourseFilters {...filterOptions} />
        </div>
      )}
      <div className="d-flex flex-column flex-grow-1">
        {visibleList.map(({ cardId }) => (
          <CourseCard key={cardId} cardId={cardId} />
        ))}
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </>
  );
};

List.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  visibleList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filterOptions: PropTypes.object.isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default List;
