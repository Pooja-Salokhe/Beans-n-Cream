import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/api.service';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CoffeeOrderComponent } from './coffee-order.component';
import { DataTablesModule } from 'angular-datatables';

describe('CoffeeOrderComponent', () => {
  let component: CoffeeOrderComponent;
  let fixture: ComponentFixture<CoffeeOrderComponent>;

  beforeEach(() => {
    const ngbModalStub = () => ({
      open: (viewUserDetails, object) => ({ result: { then: () => ({}) } })
    });
    const appServiceStub = () => ({
      getPrices: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getPayments: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getOrders: () => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const sortByPipeStub = () => ({});
    TestBed.configureTestingModule({
      imports: [FormsModule, DataTablesModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CoffeeOrderComponent],
      providers: [
        { provide: NgbModal, useFactory: ngbModalStub },
        { provide: AppService, useFactory: appServiceStub },
        { provide: SortByPipe, useFactory: sortByPipeStub }
      ]
    });
    fixture = TestBed.createComponent(CoffeeOrderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`Ingredients has default value`, () => {
    expect(component.Ingredients).toEqual(faCartPlus);
  });

  it(`RightArrow has default value`, () => {
    expect(component.RightArrow).toEqual(faChevronRight);
  });

  it(`exclamationTriangle has default value`, () => {
    expect(component.exclamationTriangle).toEqual(faExclamationTriangle);
  });

  it(`Home has default value`, () => {
    expect(component.Home).toEqual(faHome);
  });

  it(`userIcon has default value`, () => {
    expect(component.userIcon).toEqual(faUsers);
  });

  it(`Roster has default value`, () => {
    expect(component.Roster).toEqual(faUser);
  });

  it(`SearchIcon has default value`, () => {
    expect(component.SearchIcon).toEqual(faSearch);
  });

  it(`orders has default value`, () => {
    expect(component.orders).toEqual([]);
  });

  it(`users has default value`, () => {
    expect(component.users).toEqual([]);
  });

  it(`products has default value`, () => {
    expect(component.products).toEqual([]);
  });

  it(`productSizeList has default value`, () => {
    expect(component.productSizeList).toEqual([]);
  });

  it(`productPrice has default value`, () => {
    expect(component.productPrice).toEqual([]);
  });

  it(`TotalPaymentMadeByUser has default value`, () => {
    expect(component.TotalPaymentMadeByUser).toEqual([]);
  });

  it(`usersOrders has default value`, () => {
    expect(component.usersOrders).toEqual([]);
  });

  it(`filterOrder has default value`, () => {
    expect(component.filterOrder).toEqual([]);
  });

  it(`filterOrderByUserName has default value`, () => {
    expect(component.filterOrderByUserName).toEqual([]);
  });

  it(`productOrderDetails has default value`, () => {
    expect(component.productOrderDetails).toEqual([]);
  });

  it(`userOrderDetails has default value`, () => {
    expect(component.userOrderDetails).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getPrices').and.callThrough();
      spyOn(component, 'getPayments').and.callThrough();
      spyOn(component, 'getOrders').and.callThrough();
      component.ngOnInit();
      expect(component.getPrices).toHaveBeenCalled();
      expect(component.getPayments).toHaveBeenCalled();
      expect(component.getOrders).toHaveBeenCalled();
    });
  });

  describe('getPrices', () => {
    it('makes expected calls', () => {
      const appServiceStub: AppService = fixture.debugElement.injector.get(
        AppService
      );
      spyOn(appServiceStub, 'getPrices').and.callThrough();
      component.getPrices();
      expect(appServiceStub.getPrices).toHaveBeenCalled();
    });
  });

  describe('getPayments', () => {
    it('makes expected calls', () => {
      const appServiceStub: AppService = fixture.debugElement.injector.get(
        AppService
      );
      spyOn(appServiceStub, 'getPayments').and.callThrough();
      component.getPayments();
      expect(appServiceStub.getPayments).toHaveBeenCalled();
    });
  });

  describe('getOrders', () => {
    it('makes expected calls', () => {
      const appServiceStub: AppService = fixture.debugElement.injector.get(
        AppService
      );
      spyOn(component, 'getUsers').and.callThrough();
      spyOn(component, 'getProducts').and.callThrough();
      spyOn(component, 'getProductSizeList').and.callThrough();
      spyOn(component, 'getProductPrice').and.callThrough();
      spyOn(component, 'getTotalPaymentMadeByUser').and.callThrough();
      spyOn(component, 'getUsersOrders').and.callThrough();
      spyOn(component, 'getEachProductDetails').and.callThrough();
      spyOn(component, 'getEachUserDetails').and.callThrough();
      spyOn(appServiceStub, 'getOrders').and.callThrough();
      component.getOrders();
      expect(component.getUsers).toHaveBeenCalled();
      expect(component.getProducts).toHaveBeenCalled();
      expect(component.getProductSizeList).toHaveBeenCalled();
      expect(component.getProductPrice).toHaveBeenCalled();
      expect(component.getTotalPaymentMadeByUser).toHaveBeenCalled();
      expect(component.getUsersOrders).toHaveBeenCalled();
      expect(component.getEachProductDetails).toHaveBeenCalled();
      expect(component.getEachUserDetails).toHaveBeenCalled();
      expect(appServiceStub.getOrders).toHaveBeenCalled();
    });
  });
});
