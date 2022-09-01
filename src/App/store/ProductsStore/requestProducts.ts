import { PRODUCTS } from "@config/apiUrls";
import { ApiResp } from "@config/types";
import axios from "axios";

import { normalizeProductModel, ProductModel } from "../models";

export const requestProducts = async (): Promise<ApiResp<ProductModel[]>> => {
  try {
    const response = await axios({
      method: "get",
      url: PRODUCTS,
    });

    return {
      isError: false,
      data: response.data.map(normalizeProductModel),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
