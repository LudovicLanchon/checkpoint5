import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent implements OnInit {

  user: User;
  admin: any;
  product: any;
  notEnoughMoney = false;
  isLoading = true;
  productsList = [];

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) { }

  ngOnInit() {
    this.getProducts();
    this.getUser();
    this.getAdmin();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.productsList = data;
    });
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user.sold);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  getAdmin() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.admin = data.filter(user => user.role === 'admin');
        this.admin = this.admin[0];
        console.log(this.admin);
      },
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  editUser() {
    this.userService.editUser(this.user).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  editAdmin() {
    this.userService.editUser(this.admin).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  editProduct(product) {
    this.productService.editProduct(product).subscribe(
      (res) => {
        this.toast.setMessage('account settings saved!', 'success');
      },
      error => console.log(error),
    );
  }

  buy(product) {
    if (product.price > this.user.sold) {
      alert('You don\'t have enough money bitch !');
      this.notEnoughMoney = true;
    } else {
      this.user.sold -= product.price;
      this.admin.sold += product.price;
      product.stock -= 1;
    }
    this.editUser();
    this.editAdmin();
    this.editProduct(product);
  }
}
