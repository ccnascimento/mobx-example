import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import EventList from "components/EventList";
import { Image, Skeleton, SkeletonCircle, Spinner } from "@chakra-ui/react";
import Favorited from "components/Favorited";

function HeroeDetail() {
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  let { id } = useParams();

  const handleFavorite = (heroe: any) => {
    store.setFavorite({
      id: heroe?.id,
      image: `${heroe?.thumbnail.path}.${heroe?.thumbnail.extension}`,
      name: heroe?.name,
    });
    store.loadFavorites();
  };

  useEffect(() => {
    store.loadHero(id);
    store.loadEventsByHeroe(id);
    store.loadFavorites();
  }, [id, store]);

  return (
    <>
      <div className="w-full bg-red-500 h-20 flex flex-col justify-center items-center">
        <div className="container relative max-w-5xl flex flex-row items-center mx-auto text-white text-2xl px-4">
          <div
            onClick={() => navigate(-1)}
            className="text-base text-white cursor-pointer "
          >
            {"<"} Back
          </div>
          {store.isLoading ? (
            <Skeleton height="5" width="36" className="ml-6" />
          ) : (
            <h2 className="ml-6">
              Heroe: <span className="font-bold">{store.heroe?.name}</span>
            </h2>
          )}
        </div>
      </div>
      <div className="container mx-auto max-w-5xl px-4 h-full my-8">
        <div className="flex flex-col md:flex-row gap-12 pb-8 h-auto">
          <aside className="hidden md:block flex-initial justify-start items-center flex flex-col">
            <div
              className="h-6 w-6 flex flex-col justify-center items-center cursor-pointer ml-auto"
              onClick={() => handleFavorite(store.heroe)}
            >
              <Favorited id={store.heroe.id || id} />
            </div>

            <SkeletonCircle size="40" isLoaded={!store.isLoading}>
              <Image
                src={`${store.heroe?.thumbnail?.path}.${store.heroe?.thumbnail?.extension}`}
                alt={store.heroe?.name}
                className="rounded-full h-40 w-40 object-cover self-start"
              />
            </SkeletonCircle>
          </aside>
          <div className="flex-col md:flex-1 bg-white p-8 rounded-md ">
            <h2 className="text-2xl text-gray-700">
              Who is {store.heroe.name}?
            </h2>
            <p className="text-gray-600 my-4">
              {store.heroe?.description
                ? store.heroe?.description
                : "No description available"}
            </p>
            <h2 className="text-2xl text-gray-700 my-4">Event Gallery</h2>
            {store.isLoadingEvents ? (
              <div className="w-full flex items-center justify-center h-48">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            ) : store.heroe?.events?.items?.length === 0 ? (
              <p className="mt-2 text-gray-600">No events</p>
            ) : (
              <EventList />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(HeroeDetail);
