import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Location } from '../models/location.model';
import { CATEGORY_ICON_MAP } from '../constants';
import { areArraysEqual } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentLocations: Location[] = [];
  categories = [];
  locationsUpdated = new Subject<boolean>();
  categoriesUpdated = new Subject<boolean>();
  activeLocationUpdated = new Subject<boolean>();
  currentLocation: Location;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    for(const property in CATEGORY_ICON_MAP) {
      this.categories.push(property);
    }
  }

  getMarkers() {
    this.http
      .get<{ message: String; results: any[] }>(
        'http://localhost:3000/api/locations'
      )
      .pipe(
        map((data) => {
          console.log("locations from map service before pipe: " + data.results[0].category);
          return data.results.map((location) => {
            const newName = location.name.trim();
            let newDesc: string | null;
            if (location.description != null)
              newDesc = location.description.trim();
            else newDesc = null;

            return new Location(
              location.longitude,
              location.latitude,
              newName,
              location.category,
              newDesc,
              location.id,
              location.rating
            );
          });
        })
      )
      .subscribe((locationsData) => {
        // console.log(locationsData);
        if(!areArraysEqual(this.currentLocations,locationsData)) {
          this.currentLocations = locationsData;
          this.locationsUpdated.next(true);
        }
      });
  }

  rateLocation(id: number, rating: number): Observable<any> {
    return this.http.post('http://localhost:3000/api/locations/rate', {
      id: id,
      rating: rating,
    },{
      headers:{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZHpvODFAaG90bWFpbC5jb20gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwidXNlcklkIjo0LCJpYXQiOjE2MTAzMTYzMTAsImV4cCI6MTYxMDMxOTkxMH0.8DbjUL4_BqhyTGr-2ARCpuD-N8x-MxA4jDdC8nmMimk"}
    });
  }

  addLocation(location: Location): Observable<any> {
    return this.http.post('http://localhost:3000/api/locations/add', location);
  }

  updateLocation(loc: Location | null) {
    this.currentLocation = loc;
    this.activeLocationUpdated.next(true);
  }

  findLocationById(id: number): Location | null {
    for (let location of this.currentLocations) {
      if (location.id == id) return location;
    }
    return null;
  }
}
