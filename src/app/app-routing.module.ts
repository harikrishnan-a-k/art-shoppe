import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import {AuthGuard} from './components/auth/auth.guard';
import {ArtistGuard} from './components/auth/artist.guard';
import { ProductListComponent } from './components/products/product-list/product-list.component';

const routes: Routes = [{path:'', component:HomeComponent},
                        {path:'signup', component:SignupComponent},
                        {path:'login', component:LoginComponent},
                        {path:'product-create', component:ProductCreateComponent, canActivate: [AuthGuard,ArtistGuard]},
                        { path: "edit/:productId", component: ProductCreateComponent, canActivate: [AuthGuard,ArtistGuard] },
                        {path:'product-list', component:ProductListComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,ArtistGuard]
})
export class AppRoutingModule { }
