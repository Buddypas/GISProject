import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentLocations = [];
  constructor(private http:HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    this.http.get<{message:String, result:any}>("http://localhost:3000/api/locations")
    .subscribe(locationsData => {
      console.log(locationsData.message);
      console.log(locationsData.result);
    })
  }
}
