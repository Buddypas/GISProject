import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { MapComponent } from './map/map.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { AddLocationSheetComponent } from './locations/add-location/add-location-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationsComponent,
    LocationListComponent,
    AddLocationSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    ScrollingModule,
    MatBottomSheetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
