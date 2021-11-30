import { Link } from "react-router-dom";
import { IFavorite } from "../types";

interface IFavoritesList {
  favorites: IFavorite[];
}

function FavoritesList({ favorites }: IFavoritesList): JSX.Element {
  return (
    <>
      {favorites?.map((favorite: IFavorite) => {
        return (
          <div
            className="relative bg-white justify-start text-center items-center shadow-lg flex flex-col"
            key={favorite.id}
          >
            <Link to={`/heroes/${favorite.id}`} className="w-full">
              <img
                src={`${favorite.image}`}
                alt="img"
                title="img"
                className="h-48 w-full object-cover"
              />
            </Link>
            <div className="flex flex-row items-center justify-center px-4 w-full">
              <h2 className="my-4 truncate">{favorite.name}</h2>
              <div className="h-6 w-6 flex flex-col justify-center items-center cursor-pointer ml-auto">
                <i className="far fa-trash-alt text-red-500" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FavoritesList;
