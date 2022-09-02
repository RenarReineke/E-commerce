import { PRODUCTS } from "@config/apiUrls";
import { ApiResp } from "@config/types";
import axios from "axios";

import { normalizeProductModel, ProductModel } from "../models";

export const requestProductItem = async (
  url: string,
  id: string | undefined
): Promise<ApiResp<ProductModel>> => {
  try {
    const response = await axios({
      method: "get",
      url: `${url}/${id}`,
    });

    return {
      isError: false,
      data: normalizeProductModel(response.data),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
