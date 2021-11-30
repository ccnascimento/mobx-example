import { Md5 } from "ts-md5/dist/md5";
import environment from "environment";

const baseURL = "http://gateway.marvel.com";
const REACT_APP_PRIVATE_KEY = environment.REACT_APP_PRIVATE_KEY || "";
const REACT_APP_PUBLIC_KEY = environment.REACT_APP_PUBLIC_KEY || "";

export async function getAll() {
  const ts = Number(new Date());
  const hash = new Md5();
  hash.appendStr(ts + REACT_APP_PRIVATE_KEY + REACT_APP_PUBLIC_KEY);

  const response = await fetch(
    `${baseURL}/v1/public/characters?ts=${ts}&orderBy=name&limit=10&apikey=${REACT_APP_PUBLIC_KEY}&hash=${hash.end()}`
  );
  const data = await response.json();
  return data;
}

export async function getByName(heroName: string) {
  const ts = Number(new Date());
  const hash = new Md5();
  hash.appendStr(ts + REACT_APP_PRIVATE_KEY + REACT_APP_PUBLIC_KEY);

  const response = await fetch(
    `${baseURL}/v1/public/characters?nameStartsWith=${heroName}&apikey=${REACT_APP_PUBLIC_KEY}&hash=${hash.end()}`
  );
  const data = await response.json();
  return data;
}

export async function getById(id: number) {
  const ts = Number(new Date());
  const hash = new Md5();
  hash.appendStr(ts + REACT_APP_PRIVATE_KEY + REACT_APP_PUBLIC_KEY);

  const response = await fetch(
    `${baseURL}/v1/public/characters/${id}?apikey=${REACT_APP_PUBLIC_KEY}&hash=${hash.end()}`
  );
  const data = await response.json();
  return data;
}

export async function getEventsByHeroeId(id: number) {
  const ts = Number(new Date());
  const hash = new Md5();
  hash.appendStr(ts + REACT_APP_PRIVATE_KEY + REACT_APP_PUBLIC_KEY);

  const response = await fetch(
    `${baseURL}/v1/public/characters/${id}/events?apikey=${REACT_APP_PUBLIC_KEY}&hash=${hash.end()}`
  );
  const data = await response.json();
  return data;
}
