import { action, makeObservable, observable, runInAction } from "mobx";
import {
  getAll,
  getById,
  getByName,
  getEventsByHeroeId,
} from "./services/hero";
import { IHeroes, IFavorite } from "./types";

class Store {
  isLoading = false;
  isLoadingEvents = false;
  error = "";
  heroes: IHeroes[] = [];
  heroe = {};
  favorites: any = [];
  events: any = [];
  searchTerm = "";

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isLoadingEvents: observable,
      error: observable,
      heroes: observable,
      fetchHeroes: action,
      filterByHero: action,
      setFavorite: action,
      setHeroe: action,
      setHeroes: action,
      setHeroeEvents: action,
      setSearchTerm: action,
      setIsLoading: action,
      setIsLoadingEvents: action,
      favorites: observable,
      loadFavorites: action,
      loadEventsByHeroe: action,
      events: observable,
      heroe: observable,
      searchTerm: observable,
    });
  }

  async fetchHeroes() {
    this.setIsLoading(true);
    const response = await getAll();
    if (response.status === "Ok") this.setHeroes(response.data.results);
    this.setIsLoading(false);
  }

  async filterByHero(heroName: string) {
    const response = await getByName(heroName);
    if (response.status === "Ok") this.setHeroes(response.data.results);
  }

  async loadHero(id: number) {
    this.setIsLoading(true);
    const response = await getById(id);
    if (response.status === "Ok") this.setHeroe(response.data.results[0]);
    this.setIsLoading(false);
  }

  async loadEventsByHeroe(id: number) {
    this.setIsLoadingEvents(true);
    const response = await getEventsByHeroeId(id);
    if (response.status === "Ok") this.setHeroeEvents(response.data.results);
    this.setIsLoadingEvents(false);
  }

  setSearchTerm(text: string) {
    this.searchTerm = text;
  }

  setIsLoadingEvents(value: boolean) {
    this.isLoadingEvents = value;
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  setHeroeEvents(events: any) {
    this.events = events;
  }

  setHeroe(heroe: any) {
    this.heroe = heroe;
  }

  setHeroes(heroes: IHeroes[]) {
    this.heroes = heroes;
  }

  async setFavorite(favorites = {} as IFavorite) {
    if (!this.favorites) {
      this.favorites = new Array(favorites);
      this.loadFavorites();
    }

    this.favorites.findIndex((item: IFavorite) => item.id === favorites.id) ===
      -1 && this.favorites.push(favorites);

    sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  loadFavorites() {
    const data: any = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    runInAction(() => {
      this.favorites = data;
    });
  }
}

export default Store;
