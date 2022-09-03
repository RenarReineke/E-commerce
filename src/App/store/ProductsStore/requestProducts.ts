import { ApiResp } from "@config/types";
import axios from "axios";

import { normalizeProductModel, ProductModel } from "../models";

export const requestProducts = async (
  url: string,
  limit?: number
): Promise<ApiResp<ProductModel[]>> => {
  try {
    const response = await axios({
      method: "get",
      url: url,
      params: {
        limit: limit,
      },
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
