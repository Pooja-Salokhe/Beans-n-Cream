import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Users } from '../model/users';
import { Products } from '../model/products';
import { ProductSize } from '../model/productSize';
import { ProductPrice } from '../model/productPrice';
import { PaymentMadeByUser } from '../model/paymentMadeByUser';
import { UsersOrders } from '../model/userOrder';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  faCartPlus,
  faChevronRight,
  faHome,
  faUser,
  faUsers,
  faExclamationTriangle,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../services/api.service';
import { SortByPipe } from '../pipes/sort-by.pipe';


@Component({
  selector: 'app-coffee-order',
  templateUrl: './coffee-order.component.html',
  styleUrls: ['./coffee-order.component.scss']
})
export class CoffeeOrderComponent implements OnInit {

  @ViewChild('viewUserDetails') viewUserDetails: ElementRef;
  @ViewChild('viewDetails') viewDetails: ElementRef;

  Ingredients = faCartPlus;
  RightArrow = faChevronRight;
  exclamationTriangle = faExclamationTriangle;
  Home = faHome;
  userIcon = faUsers;
  Roster = faUser;
  SearchIcon = faSearch;

  priceOfEachBeverage: any[]; // store  price.json data
  paymentMadeByUser: any[]; // store  payment.json data
  orders: any = []; // store orders.json data
  users: Users[] = []; // store the user's of the application
  products: Products[] = []; // store the products  of the application
  productSizeList: ProductSize[] = []; // store the product's different size
  productPrice: ProductPrice[] = []; // store the products ,it's size and price
  TotalPaymentMadeByUser: PaymentMadeByUser[] = []; // store the total payment made by each user
  usersOrders: UsersOrders[] = []; // store the each user orders
  closeResult = '';
  filterOrder: any = []; // store the orders filter by product-name
  filterOrderByUserName: any = []; // store the orders filter by user-name
  dtOptions: DataTables.Settings = {};
  showDiv = {
    order: true,
    user: false,
    menu: false
  };
  term: string;
  productOrderDetails: any = []; // store the product  details like size , price and order by user etc
  userOrderDetails: any = []; // store each user  details like cost to pay , owed amount  , total payment , it's order.

  constructor(private service: AppService, private modalService: NgbModal, private sortBy: SortByPipe) { }

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
      this.getEachProductDetails();
      this.getEachUserDetails();
    });


  }

  /**
   * Get the user list
   */
  getUsers() {
    let groupByUser = [];
    groupByUser = this.groupBy(this.orders, 'user');
    let i = 0;

    groupByUser.forEach(element => {
      this.users.push({ userID: i, userName: element[0] });
      i++;
    }
    );
  }

  /**
   * Get the product list
   */
  getProducts() {
    let product = [];
    product = this.priceOfEachBeverage;
    let i = 0;

    product.forEach(element => {
      this.products.push({
        productID: i, productName: element.drink_name
      });
      i++;
    }
    );

  }

  /**
   * Get the product size
   */
  getProductSizeList() {
    let productSize = [];
    productSize = ['small', 'medium', 'large', 'huge', 'mega', 'ultra'];
    let i = 0;

    productSize.forEach(element => {
      this.productSizeList.push({ productSizeID: i, value: element });
      i++;
    }
    );

  }


  /**
   * Get the price of product w.r.t size.
   */
  getProductPrice() {

    let i = 0;
    let priceData = [];
    priceData = this.priceOfEachBeverage;
    priceData.forEach(element => {
      this.products.forEach(element1 => {
        if (element.drink_name === element1.productName) {
          this.productSizeList.forEach(element2 => {


            if (element.prices.hasOwnProperty(element2.value)) {

              this.productPrice.push({
                ID: i, productID: element1.productID,
                productSizeID: element2.productSizeID, price: element.prices[element2.value]
              });
              i++;
            }
          });
        }

      });
    });



  }

  /**
   * This function will calculate the total payment made by each user.
   */
  getTotalPaymentMadeByUser() {
    let paymentAmount = [];
    paymentAmount = this.groupBy(this.paymentMadeByUser, 'user');
    let i = 0;

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




  }

  /**
   * This function will store the user's order data.
   */
  getUsersOrders() {

    let usersList = [];
    usersList = this.orders;
    let i = 0;

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
                      this.usersOrders.push({ id: i, userID: userid, productPriceID: element4.ID });
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

  /**
   * This function store each product order details
   */
  getEachProductDetails() {

    this.products.forEach(element => {
      let count = 0;
      const temp: any = [];
      const productdetails: any = [];
      let username: any;
      let productSize: any;
      this.productPrice.forEach(element1 => {
        if (element.productID === element1.productID) {
          this.usersOrders.forEach(element2 => {

            if (element2.productPriceID === element1.ID) {
              count++;
              this.users.forEach(element3 => {
                if (element3.userID === element2.userID) {
                  username = element3.userName;
                }
              });

              this.productSizeList.forEach(element4 => {
                if (element4.productSizeID === element1.productSizeID) {
                  productSize = element4.value;
                }
              });
              temp.push({ user: username, size: productSize, cost: element1.price });

            }
          });
          productdetails.push({ size: productSize, cost: element1.price });
        }
      });
      this.productOrderDetails.push({
        productID: element.productID,
        productName: element.productName,
        productOrderCount: count,
        productOrderDetails: temp,
        productDetails: productdetails
      });




    });




  }

  /*
  *
  * This function will store  each user order details
  */
  getEachUserDetails() {

    this.users.forEach(element => {
      let amount = 0;
      let totalPayments: any;
      let owedAmounts = 0;
      const userOrderDetails = [];
      this.usersOrders.forEach(element1 => {

        if (element.userID === element1.userID) {
          let productNames: any;
          let productSizes: any;
          let cost: any;
          this.productPrice.forEach(element2 => {

            if (element2.ID === element1.productPriceID) {
              amount += element2.price;
              this.products.forEach(element4 => {
                if (element4.productID === element2.productID) {
                  productNames = element4.productName;

                }
              });

              this.productSizeList.forEach(element5 => {
                if (element5.productSizeID === element2.productSizeID) {
                  productSizes = element5.value;
                }
              });
              cost = element2.price;
            }

            this.TotalPaymentMadeByUser.forEach(element3 => {
              if (element3.userId === element.userID) {
                totalPayments = element3.paymentAmount;
              }
            });





          });

          userOrderDetails.push({ productSize: productSizes, productName: productNames, productPrice: cost });

          owedAmounts = amount - totalPayments;


        }
      });


      this.userOrderDetails.push({
        id: element.userID, userName: element.userName, costToPay: amount,
        totalPayment: totalPayments, owedAmount: owedAmounts, details: userOrderDetails
      });
    });


  }

  /*
  *This function filter order array  by drink name to show details on modal @param data
  */
  filterOrdersByDrinkName(data) {
    this.productOrderDetails.forEach((element1, index) => {
      if (element1.productID === data) {
        this.filterOrder = element1;

      }
    });




  }

  /**
   * This function filter order  array by user name to show details on modal @param data @param data
   */
  filterOrdersByUserName(data) {
    this.userOrderDetails.forEach(element => {
      if (element.id === data) {
        this.filterOrderByUserName = element;
      }
    });


  }




  /**
   * Open a modal for view details of each product or each user orders @param content
   */
  openModal(content, title) {
    if (content === 'viewUserDetails') {
      this.filterOrdersByUserName(title);
      this.modalService.open(this.viewUserDetails, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
    else if (content === 'viewDetails') {
      this.filterOrdersByDrinkName(title);

      this.modalService.open(this.viewDetails, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }


  }

  /**
   * This function use to  close the respective modal @param reason @returns
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}

