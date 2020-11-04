import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 1;
  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
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
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);

  }
  removeBasketItem(item: IBasketItem) {
    this.basketService.removeIteFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
     this.quantity++;
  }

  decrementItemQuantity(item: IBasketItem) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


}
