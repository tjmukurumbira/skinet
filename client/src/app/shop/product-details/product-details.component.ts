import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) {
                this.bcService.set('@productDetails', '');

    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe((res) => { 
      this.product = res;
      this.bcService.set('@productDetails', res.name);
    });
  }

}
