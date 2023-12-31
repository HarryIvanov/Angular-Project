import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from './types/Card';
import { Observable } from 'rxjs';


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
    owner: any,
    donation: number
  ) {
    return this.http.post<Card>(`/server/pets`, {
      name,
      breed,
      age,
      weight,
      image,
      owner, donation
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
    
    return this.http.delete<Card>(`/server/pets/${id}`);
  }

  addCard(id: string,
  name: string,
  age: number,
  breed: string,
  weight: number,
  image: string,
  owner: any ): void {
    // Create a new card using the Card interface
    const newCard: Card = {
      _id: id,
      name: name,
      age: age,
      breed: breed,
      weight: weight,
      image: image,
      owner: owner,
      donation: 0
      
    };

    // Push the new card into the user's cards array
    // this.user.cards.push(newCard);
  }
  updateCard(card: Card) {
    return this.http.put<Card>(`/server/pets/${card._id}`, card);
  }
  getTotalDonations(): Observable<{ totalDonations: number }> {
    const { appUrl } = environment;
  
    return this.http.get<{ totalDonations: number }>(`${appUrl}/total-donations`);
  }
 
  
}
