import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoffeeOrderComponent } from './coffee-order/coffee-order.component';
import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [AppComponent, CoffeeOrderComponent, SortByPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,

  ],
  providers: [SortByPipe],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
