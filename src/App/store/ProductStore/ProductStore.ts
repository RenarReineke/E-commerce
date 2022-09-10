import { PRODUCTS } from "@config/apiUrls";
import { ProductModel } from "@store/models";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_productItem" | "_meta" | "_url";

export default class ProductStore implements ILocalStore {
  private _productItem: ProductModel | null = null;
  private _meta: Meta = Meta.initial;
  private _url: string = PRODUCTS;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _productItem: observable,
      _meta: observable,
      _url: observable,
      meta: computed,
      url: computed,
      getProductItem: action,
    });
  }

  get productItem(): ProductModel | null {
    return this._productItem;
  }

  get meta(): Meta {
    return this._meta;
  }

  get url(): string {
    return this._url;
  }

  async getProductItem(id: string | undefined): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    this._meta = Meta.loading;
    this._productItem = null;

    try {
      const response = await axios({
        method: "get",
        url: `${this.url}/${id}`,
      });

      runInAction(() => {
        this._meta = Meta.success;
        this._productItem = response.data;
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
        this._productItem = null;
      });
    }
  }

  destroy(): void {}
}
