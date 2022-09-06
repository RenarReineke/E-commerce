import { PRODUCTS } from "@config/apiUrls";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import rootStore from "@store/RootStore/instance";
import { Meta } from "@utils/meta";
import { range } from "@utils/paginationUtils";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

import { ProductModel } from "../models";
import { SearchParam } from "../RootStore/QueryParamsStore";
import { GetProductsProps } from "./types";

type PrivateFields = "_products" | "_meta" | "_limit" | "_url" | "_currentPage";

export default class ProductsStore implements ILocalStore {
  private _products: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _limit: number = 5;
  private _currentPage: number = Number(rootStore.query.getParam("page") || 1);
  private _url: string = PRODUCTS;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _limit: observable,
      _url: observable,
      _currentPage: observable,
      products: computed,
      totalProducts: computed,
      pagesCount: computed,
      pages: computed,
      meta: computed,
      url: computed,
      currentPage: computed,
      limit: computed,
      offset: computed,
      paginatedProducts: computed,
      getProducts: action,
    });
  }

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get pagesCount(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }

  get pages(): number[] {
    return range(1, this.pagesCount);
  }

  get paginatedProducts(): ProductModel[] {
    return this.products.slice(this.offset, this.limitNumber);
  }

  get meta(): Meta {
    return this._meta;
  }

  get offset(): number {
    return this._currentPage * this._limit - this._limit;
  }

  get limit(): number {
    return this._limit;
  }

  get limitNumber(): number {
    return this.offset + this._limit;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get url(): string {
    return this._url;
  }

  async getProducts({
    search = String(rootStore.query.getParam("search") || ""),
    category = String(rootStore.query.getParam("category") || ""),
    limitApi,
  }: GetProductsProps): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    this._meta = Meta.loading;
    this._products = getInitialCollectionModel();

    const url = category !== "" ? `${this.url}/category/${category}` : this.url;

    try {
      const response = await axios({
        method: "get",
        url: url,
        params: {
          limit: limitApi,
        },
      });

      const searchedData = response.data.filter((item: ProductModel) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

      runInAction(() => {
        this._meta = Meta.success;
        this._products = normalizeCollection(
          searchedData,
          (productItem) => productItem.id
        );
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
        this._products = getInitialCollectionModel();
      });
    }
  }

  onChangeSearchParams(
    search: SearchParam,
    category: SearchParam,
    page: SearchParam
  ) {
    this._meta = Meta.initial;
    this._currentPage = Number(page || 1);
    this.getProducts({
      search: String(search || ""),
      category: String(category || ""),
    });
  }

  destroy(): void {}

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => ({
      search: rootStore.query.getParam("search"),
      category: rootStore.query.getParam("category"),
      page: rootStore.query.getParam("page"),
    }),
    ({ search, category, page }) => {
      this.onChangeSearchParams(search, category, page);
    }
  );
}
