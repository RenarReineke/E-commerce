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
import { GetProductsProps } from "./types";

type PrivateFields =
  | "_productItem"
  | "_products"
  | "_meta"
  | "_limit"
  | "_url"
  | "_currentPage";

export default class ProductsStore implements ILocalStore {
  private _productItem: ProductModel | null = null;
  private _products: CollectionModel<number, ProductModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _limit: number = 5;
  private _currentPage: number = 1;
  private _url: string = PRODUCTS;

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _productItem: observable,
      _products: observable.ref,
      _meta: observable,
      _limit: observable,
      _url: observable,
      _currentPage: observable,
      products: computed,
      meta: computed,
      url: computed,
      currentPage: computed,
      limit: computed,
      offset: computed,
      paginatedProducts: computed,
      getProducts: action,
      getProductItem: action,
    });
  }

  get productItem(): ProductModel | null {
    return this._productItem;
  }

  get products(): ProductModel[] {
    return linearizeCollection(this._products);
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
    const { isError, data } = await requestProducts(url, limitApi);

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

  destroy(): void {}

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => {
      return {
        search: rootStore.query.getParam("search"),
        category: rootStore.query.getParam("category"),
      };
    },
    ({ search, category }) => {
      this._meta = Meta.initial;
      this.getProducts({
        search: String(search || ""),
        category: String(category || ""),
      });
    }
  );

  private readonly _relatedItemsReaction: IReactionDisposer = reaction(
    () => {
      return this._productItem;
    },
    (productItem) => {
      this._meta = Meta.initial;
      const params = {
        category: productItem?.category || "",
        limitApi: 3,
      };
      this.getProducts(params);
    }
  );

  private readonly _currentPageReaction: IReactionDisposer = reaction(
    () => {
      return rootStore.query.getParam("page");
    },
    (page) => {
      this._currentPage = Number(page || 1);
    }
  );
}
