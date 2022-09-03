import { PRODUCTS } from "@config/apiUrls";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore/instance";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { ProductApiModel, ProductModel } from "../models";
import { requestProductItem } from "./requestProductItem";
import { requestProducts } from "./requestProducts";

type PrivateFields =
  | "_productItem"
  | "_products"
  | "_meta"
  | "_limit"
  | "_offset"
  | "_url"
  | "_searchFilter";

export default class ProductsStore implements ILocalStore {
  private _productItem: ProductModel | null = null;
  private _products: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _limit: number = 5;
  private _offset: number = 0;
  private _url: string = PRODUCTS;
  private _searchFilter: string = "";

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _productItem: observable,
      _products: observable.ref,
      _meta: observable,
      _limit: observable,
      _offset: observable,
      _url: observable,
      _searchFilter: observable,
      products: computed,
      meta: computed,
      limit: computed,
      getProducts: action,
      getProductItem: action,
      setSearchFilter: action.bound,
      // getSearchedProduct: action.bound,
    });
  }

  get searchFilter(): string {
    return this._searchFilter;
  }

  // get searchedProducts(): ProductModel[] {
  //   const search = String(rootStore.query.getParam("search"));
  //   const data = linearizeCollection(this._products).filter((item) =>
  //     item.title.includes(search)
  //   );
  //   /* eslint-disable no-console */
  //   console.log("SearchedProduct: ", data, search);
  //   return data;
  // }

  get productItem(): ProductModel | null {
    return this._productItem;
  }

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  get meta(): Meta {
    return this._meta;
  }

  get limit(): number {
    return this._limit;
  }

  get offset(): number {
    return this._offset;
  }

  get url(): string {
    return this._url;
  }

  async getProducts(search: string = ""): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    /* eslint-disable no-console */
    console.log("SEARCH_GET_PRODUCTS: ", search);

    this._meta = Meta.loading;
    this._products = getInitialCollectionModel();

    const { isError, data } = await requestProducts(this.url, this.limit);

    const searchedData = data.filter((item: ProductApiModel) =>
      item.title.includes(search)
    );

    runInAction(() => {
      if (isError) {
        this._meta = Meta.error;
        this._products = getInitialCollectionModel();
        return;
      }
      this._meta = Meta.success;
      this._products = normalizeCollection(
        searchedData,
        (productItem) => productItem.id
      );
    });
  }

  async getRelatedProducts(category: string | undefined): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    this._meta = Meta.loading;
    this._products = getInitialCollectionModel();

    const { isError, data } = await requestProducts(
      `${this.url}/category/${category}`,
      3
    );

    runInAction(() => {
      if (isError) {
        this._meta = Meta.error;
        this._products = getInitialCollectionModel();
        return;
      }
      this._meta = Meta.success;
      this._products = normalizeCollection(
        data,
        (productItem) => productItem.id
      );
    });
  }

  async getProductItem(id: string | undefined): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    this._meta = Meta.loading;
    this._productItem = null;

    const { isError, data } = await requestProductItem(this.url, id);

    runInAction(() => {
      if (isError) {
        this._meta = Meta.error;
        this._productItem = null;
        return;
      }
      this._meta = Meta.success;
      this._productItem = data;
    });
  }

  setSearchFilter(value: string) {
    this._searchFilter = value;
  }

  // getSearchedProduct(searchValue: string) {
  //   /* eslint-disable no-console */
  //   console.log("getSearchedProduct");
  //   const data = linearizeCollection(this._products).filter((item) =>
  //     item.title.includes(searchValue)
  //   );
  //   this._products = normalizeCollection(data, (productItem) => productItem.id);
  // }

  destroy(): void {}

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => {
      return rootStore.query.getParam("search");
    },
    (search) => {
      /* eslint-disable no-console */
      console.log("SEARCH_REACTION: ", search);
      console.log("META: ", this.meta);
      if (search) {
        this._meta = Meta.initial;
        this.getProducts(String(search));
      }
    }
  );
}
