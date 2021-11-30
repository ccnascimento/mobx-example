import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../App";
import FavoritesList from "../components/FavoritesList";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const store = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFavorites() {
      await store.loadFavorites();
    }
    loadFavorites();
  }, [store]);

  return (
    <>
      <div className="w-full bg-red-500 h-20 flex flex-col justify-center items-center">
        <div className="container relative max-w-5xl flex flex-row items-center mx-auto text-white text-2xl">
          <div
            onClick={() => navigate(-1)}
            className="text-base text-gray-50 cursor-pointer "
          >
            {"<"} Back
          </div>
          <h2 className="ml-6">Favorites</h2>
        </div>
      </div>
      {store.favorites && store.favorites?.length > 0 ? (
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <FavoritesList favorites={store?.favorites} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-5xl">
          <p className="p-20 text-gray-50 text-2xl">
            You don't have favorites yet!
          </p>
        </div>
      )}
    </>
  );
}

export default observer(Favorites);
