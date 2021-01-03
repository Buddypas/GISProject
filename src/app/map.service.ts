import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentLocations = [];
  constructor(private http:HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  // getMarkers() {

  // }
}
