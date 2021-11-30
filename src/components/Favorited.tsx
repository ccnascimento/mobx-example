import { StoreContext } from "App";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

function Favorited({ id }: any) {
  const store = useContext(StoreContext);

  return store.favorites.some((fav: any) => fav.id === id) ? (
    <span className="text-yellow-500 text-2xl">&#9733;</span>
  ) : (
    <span className="text-gray-400 text-2xl">&#9733;</span>
  );
}

export default observer(Favorited);
