import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { Observable } from 'rxjs';
import { IProductType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brands';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();
    if (shopParams.selectedBrandId !== 0){
      params = params.append('brandId', shopParams.selectedBrandId .toString());
    }
    if (shopParams.selectedTypeId !== 0){
      params = params.append('typeId', shopParams.selectedTypeId.toString());
    }
    params = params.append('sort', shopParams.selectedSort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    return this.http.get<IPagination>( this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
