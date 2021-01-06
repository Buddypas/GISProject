import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MapComponent } from './map/map.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { AddLocationSheetComponent } from './locations/add-location/add-location-sheet.component';
import { LocationDetailsComponent } from './locations/location-details/location-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationsComponent,
    LocationListComponent,
    AddLocationSheetComponent,
    LocationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
