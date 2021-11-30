import { Image } from "@chakra-ui/image";
import { StoreContext } from "App";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

function EventList(): JSX.Element {
  const store = useContext(StoreContext);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      {store.events?.map((event: any) => {
        return (
          <div
            className="relative bg-white justify-center text-center items-center shadow-lg grid grid-cols-1"
            key={event.id}
          >
            <Image
              src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
              alt={event.title}
              className="h-48 w-full object-cover"
            />

            <h2 className="my-4 truncate px-4">{event.title}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default observer(EventList);
