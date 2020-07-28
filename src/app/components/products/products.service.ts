import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {Product} from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        "http://localhost:5000/api/products" + queryParams
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                title: product.title,
                description: product.description,
                price: product.price,
                id: product._id,
                imagePath: product.imagePath,
                creator: product.creator
              };
            }),
            maxProducts: productData.maxProducts
          };
        })
      )
      .subscribe(transformedProductData => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductData.maxProducts
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      price:string
      imagePath: string;
      creator: string;
    }>("http://localhost:5000/api/products/" + id);
  }

  addProduct(title: string, description: string, image: File, price:string) {
    const productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    productData.append("image", image, title);
    productData.append("price", price);
    this.http
      .post<{ message: string; post: Product }>(
        "http://localhost:5000/api/products",
        productData
      )
      .subscribe(responseData => {
        this.router.navigate(["/product-list"]);
      });
  }

  updateProduct(id: string, title: string, description: string,price:string, image: string | File) {
    let productData: Product | FormData;
    if (typeof image === "object") {
      productData = new FormData();
      productData.append("id", id);
      productData.append("title", title);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("image", image, title);
    } else {
      productData = {
        id: id,
        title: title,
        description: description,
        price:price,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put("http://localhost:5000/api/products/" + id, productData)
      .subscribe(response => {
        this.router.navigate(["/product-list"]);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete("http://localhost:5000/api/products/" + productId);
  }


}
