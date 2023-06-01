import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'recent_search', component: RecentSearchComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    FavouriteComponent,
    RecentSearchComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
