import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CONFIG_CONSTANTS} from '../app-constants/app-constants';
import {Fork} from '../models/priority-models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForksService {

  constructor(private hhtp: HttpClient) {
  }


  public getForksCount(searchCriteria: string): Observable<any> {
    return this.hhtp.get(API_CONFIG_CONSTANTS.endpoint + '/' + searchCriteria);
  }

  public getForks(searchCriteria: string, pageSize: number, page: number): Observable<Array<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', pageSize.toString());
    const getUrl: string  = API_CONFIG_CONSTANTS.endpoint + '/' + searchCriteria + '/forks?' + params.toString();
    return this.hhtp.get<Array<Fork>>(getUrl);
  }

}
