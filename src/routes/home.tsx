import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../App";
import useDebounce from "../hooks/useDebounce";
import HeroesList from "../components/HeroesList";
import { Button, Input } from "@chakra-ui/react";

function Heroes() {
  const store = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const handleSearch = () => {
    if (debouncedSearchTerm !== "") {
      store.filterByHero(debouncedSearchTerm);
    } else {
      (store.heroes.length === 0 || store.heroe.name) && store.fetchHeroes();
    }
  };

  useEffect(() => {
    if (store.heroes.length === 0) store.fetchHeroes();
  }, [store]);

  return (
    <>
      <div className="w-full bg-red-500 h-20 flex flex-col justify-center items-center">
        <div className="container relative max-w-5xl mx-auto flex flex-row items-center">
          <Input
            type="search"
            name="search"
            placeholder="Search for an hero"
            autoFocus={true}
            onChange={(evt: React.SyntheticEvent<EventTarget>) => {
              const value = (evt.target as HTMLInputElement).value;
              if (value === "") {
                store.fetchHeroes();
              } else {
                setSearchTerm(value);
              }
            }}
            inputMode="search"
            bgColor="white"
            focusBorderColor="#9B2C2C"
          />
          <Button
            type="button"
            colorScheme=""
            color="white"
            bgColor="#9B2C2C"
            className="ml-4 text-white"
            variant="solid"
            borderColor="#9B2C2C"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <HeroesList heroes={store.heroes} />
        </div>
      </div>
    </>
  );
}

export default observer(Heroes);
