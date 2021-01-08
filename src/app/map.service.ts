import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Location } from './models/location.model';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentLocations: Location[] = [];
  categories: Category[] = [];
  locationsUpdated = new Subject<boolean>();
  categoriesUpdated = new Subject<boolean>();
  activeLocationUpdated = new Subject<boolean>();
  currentLocation: Location;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getLocationCategories() {
    this.http
      .get<{ message: String; results: Category[] }>(
        'http://localhost:3000/api/categories'
      )
      .pipe(
        map((data) => {
          // console.log("data from pipe: " + data.results);
          return data.results.map((category) => {
            const newType = category.name.trim();
            return new Category(newType, category.id);
          });
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.categories = data;
        this.categoriesUpdated.next(true);
      });
  }

  getMarkers() {
    this.http
      .get<{ message: String; results: any[] }>(
        'http://localhost:3000/api/locations'
      )
      .pipe(
        map((data) => {
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
              newDesc,
              location.category_id,
              location.id,
              location.rating
            );
          });
        })
      )
      .subscribe((locationsData) => {
        console.log(locationsData);
        this.currentLocations = locationsData;
        this.locationsUpdated.next(true);
      });
  }

  rateLocation(id:number,rating: number): Observable<any> {
    return this.http.post('http://localhost:3000/api/locations/rate', {
      id:id,
      rating: rating
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
