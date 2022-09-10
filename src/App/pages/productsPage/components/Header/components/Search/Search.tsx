import React, { useState } from "react";

import Button from "@components/Button";
import FilterIcon from "@components/FilterIcon";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";
import rootStore from "@store/RootStore/instance";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import style from "./Search.module.scss";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const storeParams = rootStore.query.params;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setParams({ ...storeParams, search });
    setSearch("");
  };

  const handleFilterClick = () => {
    setParams({ ...storeParams, category: "men's clothing" });
  };

  return (
    <div className={style.container}>
      <form className={style.search} onSubmit={handleSubmit}>
        <span className={style["search-icon"]}>
          <SearchIcon />
        </span>
        <Input
          className={style["search-input"]}
          placeholder="Search property"
          value={search}
          onChange={setSearch}
        />
        <Button type="submit" className={style["button-input"]}>
          Find Now
        </Button>
      </form>
      <button onClick={handleFilterClick} className={style.filter}>
        <span className={style["filter-icon"]}>
          <FilterIcon />
        </span>
        Filter
      </button>
    </div>
  );
};

export default observer(Search);
