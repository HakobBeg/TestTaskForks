import {Fork, ForksState} from './priority-models';
import {TableModel} from './table-model';

export interface AppState {
  forks: ForksState;
  table: TableModel
}
