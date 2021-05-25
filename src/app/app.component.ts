import {Component, OnInit} from '@angular/core';
import {first, map} from 'rxjs/operators';
import {ForksService} from '../services/forks.service';
import {select, Store} from '@ngrx/store';
import {setForksCount, setRetrivedForks, setSaveMethodId} from '../ngrx/actions/forsk.actions';
import {selectForks, selectForksCount, selectSAveMethodId} from '../ngrx/selectors/forks.selectors';
import {showAnimation} from '../animations/simpleAnimations';
import {ANIMATION_CONSTANTS, RESULT_TABLE_CONSTANTS, TEXT_CONSTANTS} from '../app-constants/app-constants';
import {zip} from 'rxjs';
import {setTableConfigs} from '../ngrx/actions/table.actions';
import {selectPage, selectPageSize, selectSearchCriteria} from '../ngrx/selectors/table.selectors';
import {Fork} from '../models/priority-models';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {FirebaseWorkerService} from '../services/firebase-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [showAnimation]
})
export class AppComponent implements OnInit {
//constant scope rearranging
  public animationTex = TEXT_CONSTANTS.topAnimationText;
  public bottomAnimationTex = TEXT_CONSTANTS.bottomAnimationText;
  public enterAnimation = ANIMATION_CONSTANTS;
  public columnNames = RESULT_TABLE_CONSTANTS.columnNames;
//simple state for animations and so on... not actuall for ngrx
  public isSearched: boolean;
  public showTable: boolean;
  public isLoadingResults = true;
  public errorOccured: boolean;
  public error = '';

//ngrx getters
  public forks = this.store.pipe(select(selectForks));
  public forksCount = this.store.pipe(select(selectForksCount));
  public searchCriteria = this.store.select(selectSearchCriteria);
  public saveMethodid = this.store.select(selectSAveMethodId);
  public pageSize = this.store.select(selectPageSize);
  public page = this.store.select(selectPage);

  public dataSource: Array<Fork> = [];
  private isFirst = false;

  constructor(private forksService: ForksService, private store: Store, public dialog: MatDialog, private  firebaseWorkerService: FirebaseWorkerService) {
  }

  ngOnInit(): void {
    this.forks.subscribe((res) => {
      this.dataSource = res;
      if (this.isFirst) {
        this.isLoadingResults = false;
      }
      this.isFirst = true;
    }, (err) => {
      this.errorOccured = true;
      this.error = err;
    });
  }


  public handlePaginatorAction(event: any): void {
    this.isLoadingResults = true;
    zip(this.searchCriteria, this.forksCount).pipe(first()).subscribe((res) => {
      this.store.dispatch(setTableConfigs({
        configs: {
          pageSize: event.pageSize,
          page: event.pageIndex,
          searchCriteria: res[0],
          length: res[1]
        }
      }));
      this.forksService.getForks(res[0], event.pageSize, event.pageIndex).pipe(first()).subscribe((forks) => {
          forks = forks.map((i) => {
            return {fullName: i.full_name, owner: i.owner.login, stars: i.stargazers_count, url: i.forks_url};
          });
          this.store.dispatch(setRetrivedForks({
            forks
          }));
        },
        (err) => {
          this.errorOccured = true;
          this.error = err;
        }
      );

    });

  }


  public search(event: string): void {
    zip(this.forksService.getForksCount(event.split(':').slice(1, 3).join('')).pipe(first(), map((count) => {
        count = count.forks;
        this.store.dispatch(setForksCount({count}));
        this.store.dispatch(setTableConfigs({
          configs: {
            page: 1,
            pageSize: 5,
            length: count,
            searchCriteria: event.split(':').slice(1, 3).join('')
          }
        }));
      })),
      this.forksService.getForks(event.split(':').slice(1, 3).join(''), 10, 1).pipe(first(), map((forks) => {
        forks = forks.map((i) => {
          return {fullName: i.full_name, owner: i.owner.login, stars: i.stargazers_count, url: i.forks_url};
        });
        this.store.dispatch(setRetrivedForks({
          forks
        }));

      })),
      this.forks.pipe(
        first(), map((res) => {
          this.isSearched = true;
          setTimeout(() => {
            this.showTable = true;
          }, 500);
        }))
    ).pipe(
      first()
    ).subscribe((res) => {

      },
      (err) => {
        this.errorOccured = true;
        this.error = err;
      });
  }

  public back(): void {
    this.isLoadingResults = true;
    this.error = '';
    this.errorOccured = false;
    this.showTable = false;
    setTimeout(() => {
      this.isSearched = false;
      this.dataSource = [];
    }, 500);
  }

  public searchCurrent(src: any): void {
    this.isLoadingResults = true;
    this.search(':' + src.fullName);
  }


  public setMethod(a: any, b: any): void {
    if (a && b) {
      this.store.dispatch(setSaveMethodId({methodId: 3}));
    } else {
      if (a) {
        this.store.dispatch(setSaveMethodId({methodId: 1}));
      } else if (b) {
        this.store.dispatch(setSaveMethodId({methodId: 2}));
      } else {
        this.store.dispatch(setSaveMethodId({methodId: 1}));
      }
    }
  }

  public confirmSaving(fork: Fork): void {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().pipe(first()).subscribe((res) => {
      if (res) {
        this.store.select(selectSAveMethodId).pipe(first()).subscribe((id) => {
          switch (id) {
            case 1:
              //localStorageCase
              this.addItemtoLocalStorage(fork);
              alert('Fork Added Sucssesfull!');
              break;
            case 2:
              //firebaseCase
              this.firebaseWorkerService.setItemToDb(fork).then(() => alert('Fork Added Sucssesfull!')).catch(() => alert('Something went wrong, please try again!'));
              break;
            case 3:
              //doubleCase
              this.addItemtoLocalStorage(fork);
              this.firebaseWorkerService.setItemToDb(fork).then(() => alert('Fork Added Sucssesfull!')).catch(() => alert('Something went wrong, please try again!'));
              break;
          }
        });
      }
    });
  }

  public addItemtoLocalStorage(item: Fork): void {
    localStorage.setItem(item.fullName, JSON.stringify(item));
  }


}

