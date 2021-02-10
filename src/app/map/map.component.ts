import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { AddLocationSheetComponent } from '../locations/add-location/add-location-sheet.component';
import { MapService } from '../services/map.service';
import { Location } from '../models/location.model';
import { GeoJson } from '../models/map';
import { CATEGORY_ICON_MAP } from '../constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  lat = 37.75;
  lng = -122.41;
  locationsSub: Subscription;
  locations: Location[] = [];
  features = [];

  constructor(
    private mapService: MapService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    this.buildMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
        });
      });
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [this.lng, this.lat],
    });
    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.features,
        },
      });

      // Add a layer showing the places.
      this.map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': '{icon}-15',
          'icon-allow-overlap': true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      this.map.on('click', 'places', (e) => {
        e.preventDefault();
        let coordinates = e.features[0].geometry.coordinates.slice();
        let id = e.features[0].properties.id;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        const activeLoc = this.mapService.findLocationById(id);
        this.mapService.updateLocation(activeLoc);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      this.map.on('mouseenter', 'places', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'places',  () => {
        this.map.getCanvas().style.cursor = '';
      });

      //// Add Marker on Click
      this.map.on('click', (event) => {
        if(event.defaultPrevented) return;
        if(this.mapService.currentLocation != null) this.mapService.updateLocation(null);
        const coordinates = [event.lngLat.lng, event.lngLat.lat];
        this.lng = coordinates[0];
        this.lat = coordinates[1];
        this.openBottomSheet();
      });

      this.locationsSub = this.mapService.locationsUpdated.subscribe(
        (hasChanged) => {
          if (hasChanged) {
            if (
              this.mapService.currentLocations.length > this.locations.length &&
              this.locations.length > 0
            )
              this._snackBar.open('Location added!', 'Close', {
                duration: 2500,
              });
              if(this.locations !== this.mapService.currentLocations) {
                this.locations = [...this.mapService.currentLocations];
                this.loadMarkers();
              }
          }
        }
      );
      setInterval(() => this.mapService.getMarkers(),3000);
      // this.mapService.getMarkers();
    });
  }


  private loadMarkers() {
    this.features.length = 0;
    this.locations.forEach((loc) => {
      let feature = {
        type: 'Feature',
        properties: {
          id: loc.id,
          name: loc.name,
          description: loc.description,
          icon: CATEGORY_ICON_MAP[loc.category.trim()],
        },
        geometry: {
          type: 'Point',
          coordinates: [loc.longitude, loc.latitude],
        },
      };
      this.features.push(feature);
    });
    this.map.getSource('places').setData({
      type: 'FeatureCollection',
      features: this.features,
    });
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(AddLocationSheetComponent, {
      data: { lng: this.lng, lat: this.lat },
    });
  }
}
