import {createSelector} from '@ngrx/store';
import {Fork} from '../../models/priority-models';

export const selectSearchCriteria = createSelector(
  (state: any) => state.reducers.table.searchCriteria,
  (searchCriteria: string) => searchCriteria
);

export const selectPageSize = createSelector(
  (state: any) => state.reducers.table.pageSize,
  (pageSize: number) => pageSize
);


export const selectPage = createSelector(
  (state: any) => state.reducers.table.page,
  (page: number) => page
);
