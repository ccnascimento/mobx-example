import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../App";
import { IHeroes } from "../types";
import { Link } from "react-router-dom";
import { Image, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import Favorited from "./Favorited";

interface IHeroList {
  heroes: IHeroes[];
}

function HeroesList({ heroes }: IHeroList): JSX.Element {
  const store = useContext(StoreContext);

  function handleFavorite(heroe: any) {
    store.setFavorite({
      id: heroe?.id,
      image: `${heroe?.thumbnail.path}.${heroe?.thumbnail.extension}`,
      name: heroe?.name,
    });
    store.loadFavorites();
  }

  useEffect(() => {
    store.loadFavorites();
  }, [store]);

  return (
    <>
      {store.isLoading
        ? Array.from(Array(10).keys()).map((item: any, index: number) => (
            <div
              className="relative bg-white justify-start text-center items-center shadow-lg  flex flex-col"
              key={index}
            >
              <Skeleton className="h-48 w-full object-cover" />
              <div className="flex flex-row items-center justify-center px-4 py-3 w-full">
                <Skeleton height="5" width="36" />
                <SkeletonCircle size="10" ml="auto" />
              </div>
            </div>
          ))
        : heroes.map((heroe: IHeroes) => (
            <div
              className="relative bg-white justify-start text-center items-center shadow-lg  flex flex-col"
              key={heroe.id}
            >
              <Link
                to={`/heroes/${heroe.id}`}
                className="w-full"
                onClick={() => store.setSearchTerm(heroe?.name)}
              >
                <Image
                  src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
                  alt={heroe.name}
                  loading="lazy"
                  className="h-48 w-full"
                  objectFit="cover"
                />
              </Link>
              <div className="flex flex-row items-center justify-center px-4 w-full">
                <h2 className="my-4 truncate">{heroe.name} </h2>
                <div
                  className="h-6 w-6 flex flex-col justify-center items-center cursor-pointer ml-auto"
                  onClick={() => handleFavorite(heroe)}
                  title={`Add ${heroe.name} to favorite list.`}
                >
                  <Favorited id={heroe.id} />
                </div>
              </div>
            </div>
          ))}
      )
    </>
  );
}

export default observer(HeroesList);
