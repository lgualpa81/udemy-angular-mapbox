import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  public selectedId: string = '';
  constructor(private ps: PlacesService, private ms: MapService) {}

  get isLoadingPlaces(): boolean {
    return this.ps.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.ps.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.ms.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this.ps.userLocation) throw Error('userLocation no definido');

    this.ps.deletePlaces();

    const start = this.ps.userLocation;
    const end = place.center as [number, number];
    this.ms.getRouteBetweenPoints(start, end);
  }
}
