import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from './types/Card';
import { Observable } from 'rxjs';
import { User } from './types/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCards() {
    const { appUrl } = environment;

    return this.http.get<Card[]>(`${appUrl}/pets`);
  }
  getCard(id: string) {
    const { appUrl } = environment;

    return this.http.get<Card>(`${appUrl}/pets/${id}`);
  }
  createCard(
    name: string,
    breed: string,
    age: number,
    weight: number,
    image: string,
    owner: any
  ) {
    return this.http.post<Card>(`/server/pets`, {
      name,
      breed,
      age,
      weight,
      image,
      owner
    });
  }
  editCard(
    name: string,
    breed: string,
    age: number,
    weight: number,
    image: string,
    id: string
  ) {
    return this.http.put<Card>(`/server/pets/${id}`, {
      name,
      breed,
      age,
      weight,
      image,
    });
  }
  deleteCard(id: string) {
    // Use the ID in the URL to identify the resource to delete
    return this.http.delete<Card>(`/server/pets/${id}`);
  }
  
 
  
}
