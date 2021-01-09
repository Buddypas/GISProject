export class Location {
  id?: number;
  latitude: number;
  longitude: number;
  name: string;
  category:string;
  rating?:number;
  description?: string;

  constructor(
    longitude: number,
    latitude: number,
    name: string,
    category: string,
    description?: string,
    id?: number,
    rating?:number
  ) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.name = name;
    this.id = id;
    this.description = description;
    this.category = category;
    this.rating = rating;
  }
}
