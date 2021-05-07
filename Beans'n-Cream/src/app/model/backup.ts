import { Component, OnInit } from '@angular/core';
import { AppService } from '../api.service';
import { Users } from '../model/users';
import { Products } from '../model/products';
import { ProductSize } from '../model/productSize';
import { ProductPrice } from '../model/productPrice';
import { PaymentMadeByUser } from '../model/paymentMadeByUser';
import { element } from 'protractor';
import { UsersOrders } from '../model/userOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  priceOfEachBeverage: any[];
  paymentMadeByUser: any[];
  orders: any = [];

  users: Users[] = [];
  products: Products[] = [];
  productSizeList: ProductSize[] = [];
  productPrice: ProductPrice[] = [];
  TotalPaymentMadeByUser: PaymentMadeByUser[] = [];
  usersOrders: UsersOrders[] = [];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getPrices();
    this.getPayments();
    this.getOrders();

  }


  /*
   * Get the details of  beverages type , it's size and  prices.
  */
  getPrices() {
    this.service.getPrices().pipe().subscribe((prices: any[]) => {
      this.priceOfEachBeverage = prices;
      console.log('prices list', this.priceOfEachBeverage);
    });


  }

  /*
  * Get the payments made by users paying for items they have purchased.
  */
  getPayments() {
    this.service.getPayments().pipe().subscribe((payments: any[]) => {
      this.paymentMadeByUser = payments;
    });
  }

  /**
   * Get the details of beverages ordered by users of the app
   */
  getOrders() {
    this.service.getOrders().pipe().subscribe((orders: any) => {
      this.orders = orders;
      this.getUsers();
      this.getProducts();
      this.getProductSizeList();
      this.getProductPrice();
      this.getTotalPaymentMadeByUser();
      this.getUsersOrders();
    });


  }

  /**
   * Get the user list
   */
  getUsers() {
    let groupByUser = [];
    groupByUser = this.groupBy(this.orders, 'user');
    let i = 0;
    // tslint:disable-next-line:no-shadowed-variable
    groupByUser.forEach(element => {
      this.users.push({ userID: 'user' + i, userName: element[0] });
      i++;
    }
    );
    console.log('user list', this.users);
  }

  /**
   * Get the product list
   */
  getProducts() {
    let product = [];
    product = this.priceOfEachBeverage;
    let i = 0;
    // tslint:disable-next-line:no-shadowed-variable
    product.forEach(element => {
      this.products.push({ productID: 'product' + i, productName: element.drink_name });
      i++;
    }
    );
    console.log('product list', this.products);
  }

  /**
   * Get the product size
   */
  getProductSizeList() {
    let productSize = [];
    productSize = ['small', 'medium', 'large', 'huge', 'mega', 'ultra'];
    let i = 0;
    // tslint:disable-next-line:no-shadowed-variable
    productSize.forEach(element => {
      this.productSizeList.push({ productSizeID: 'productSize' + i, value: element });
      i++;
    }
    );
    console.log('product size list', this.productSizeList);
  }


  /**
   * Get the price of product w.r.t size.
   */
  getProductPrice() {

    let i = 0;
    let priceData = [];
    priceData = this.priceOfEachBeverage;
    // tslint:disable-next-line:no-shadowed-variable
    priceData.forEach(element => {
      this.products.forEach(element1 => {
        if (element.drink_name === element1.productName) {
          this.productSizeList.forEach(element2 => {
            // this.beveragesPrices[k].prices.hasOwnProperty(objectArray[i][1][j].size)

            if (element.prices.hasOwnProperty(element2.value)) {
              // tslint:disable-next-line:max-line-length
              this.productPrice.push({ ID: i, productID: element1.productID, productSizeID: element2.productSizeID, price: element.prices[element2.value] });
              i++;
            }
          });
        }

      });
    });

    console.log('product price', this.productPrice);

  }


  getTotalPaymentMadeByUser() {
    let paymentAmount = [];
    paymentAmount = this.groupBy(this.paymentMadeByUser, 'user');
    let i = 0;
    // let amount = 0;
    // tslint:disable-next-line:no-shadowed-variable
    paymentAmount.forEach(element => {
      this.users.forEach(element2 => {
        if (element2.userName === element[0]) {
          let amount = 0;
          element[1].forEach(element1 => {
            amount += element1.amount;
          });
          this.TotalPaymentMadeByUser.push({ id: i, userId: element2.userID, paymentAmount: amount });
          i++;
        }
      });
    });

    console.log('TotalPaymentMadeByUser', this.TotalPaymentMadeByUser);


  }

  getUsersOrders() {

    let usersList = [];
    usersList = this.orders;
    let i = 0;

    // tslint:disable-next-line:no-shadowed-variable
    usersList.forEach(element => {
      this.users.forEach(element1 => {
        const userid = element1.userID;
        if (element1.userName === element.user) {
          this.products.forEach(element2 => {
            if (element2.productName === element.drink) {
              const productId = element2.productID;
              this.productSizeList.forEach(element3 => {
                if (element3.value === element.size) {
                  const productSizeId = element3.productSizeID;

                  this.productPrice.forEach(element4 => {
                    if (element4.productID === productId && element4.productSizeID === productSizeId) {
                      this.usersOrders.push({ ID: i, userID: userid, productPriceID: element4.ID });
                      i++;
                    }
                  });
                }
              });
            }
          });
        }
      });

    });
    console.log('user orders', this.usersOrders);

  }










  // Accepts the array and key
  groupBy = (array, key) => {
    // Return the end result
    return Object.entries(array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {})); // empty object is the initial value for result object
  }




}
