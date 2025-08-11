import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { IBreedsResponse } from '../../core/interfaces/breeds.inteface';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreedsRequestService {

  private destroyed$ = new Subject<void>();

  constructor(
    private _httpService: HttpService
  ) {}

  public destroy() {
    this.destroyed$.next();
  }

  public getAllBreeds() {
    return new Promise<any>(async (resolve, reject) => {
      const url = 'breeds/list/all';

      this._httpService.get(url).pipe(takeUntil(this.destroyed$)).subscribe({

        next: async (response: IBreedsResponse) => {

          if (response.status === 'success') {
            resolve(response.message);
          } else {
            reject(response);
          }

        },
        error: (error: any) => {
          reject(error);
        }

      });
    });
  }
}
