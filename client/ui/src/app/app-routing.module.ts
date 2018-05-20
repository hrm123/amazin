import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AddressComponent} from './address/address.component';
import {CategoriesComponent} from './categories/categories.component';
import {PostProductComponent} from './post-product/post-product.component';
import {MyProductsComponent} from './my-products/my-products.component';
import {ProductComponent} from './product/product.component';
import {CategoryComponent} from './category/category.component';
import {SearchComponent} from './search/search.component';
import {AuthGuardService} from './auth-guard.service';
import { ChatComponent } from './chat/chat.component';

const Ruts: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'search',
    component: SearchComponent
  },
  {
    path:'chat',
    component: ChatComponent
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'categories',
    component: CategoriesComponent
  },
  {
    path:'categories/:id',
    component: CategoryComponent
  },
  {
    path:'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile/postproduct',
    component: PostProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'product/:id',
    component: ProductComponent
  },
  {
    path:'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile/myproducts',
    component: MyProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Ruts)], //  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
