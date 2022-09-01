import { Meta } from "@utils/meta";
import { action, makeObservable, observable } from "mobx";

import { ProductModel } from "../models";
import { requestProducts } from "./requestProducts";

export default class ProductsStore {
  products: ProductModel[] = [];
  meta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      products: observable,
      meta: observable,
      fetch: action,
    });
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) return;

    this.meta = Meta.loading;
    this.products = [];

    const { isError, data } = await requestProducts();
    if (isError) {
      this.meta = Meta.error;
      return;
    }

    this.meta = Meta.success;
    this.products = data;
  }

  destroy(): void {}
}
