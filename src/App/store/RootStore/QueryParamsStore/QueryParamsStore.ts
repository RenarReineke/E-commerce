import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_path" | "_params";

export default class QueryParamsStore {
  private _path: string = "";
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _path: observable.ref,
      _params: observable.ref,
      setSearch: action,
      setPath: action,
    });
  }

  get path() {
    return this._path;
  }

  get params() {
    return this._params;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setPath(path: string) {
    this._path = path;
  }
}
