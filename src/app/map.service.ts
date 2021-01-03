import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Location } from './models/location.model';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentLocations: Location[] = [];
  locationsUpdated = new Subject<boolean>();
  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    this.http
      .get<{ message: String; results: Location[] }>(
        'http://localhost:3000/api/locations'
      )
      .pipe(
        map((data) => {
          return data.results.map((location) => {
            const newName = location.name.trim();
            let newDesc:string | null;
            if (location.description != null)
              newDesc = location.description.trim();
            else
              newDesc = null;

            return new Location(
              location.id,
              location.longitude,
              location.latitude,
              newName,
              newDesc
            );
          });
        })
      )
      .subscribe((locationsData) => {
        console.log(locationsData);
        // console.log(locationsData["message"]);
        // console.log(locationsData["results"]);
        this.currentLocations = locationsData;
        this.locationsUpdated.next(true);
      });
  }
}
