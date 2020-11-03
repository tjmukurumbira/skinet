import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IProductType[];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ];
  totalCount: number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe((response) => { this.brands = [{id: 0, name: ' All'}, ...response] ; });
  }

  getProductTypes(): void {
     this.shopService.getTypes().subscribe((response) => { this.types = [{id: 0, name: ' All'}, ...response]; });

  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams)
    .subscribe((response) => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number): void {
    this.shopParams.selectedBrandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number): void {
    this.shopParams.selectedTypeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.selectedSort = sort;
    this.getProducts();
  }

  onPageChanged( event: any): void {
    if (event !== this.shopParams.pageNumber) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
