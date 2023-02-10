import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, IPlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApi: PlacesApiClient, private ms: MapService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocation');
          console.log(err);
          reject(err);
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) throw Error('UserLocation no definido');

    this.isLoadingPlaces = false;
    this.placesApi
      .get<IPlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;

        this.ms.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
