import { all, call } from "typed-redux-saga/macro";

import { CategoriesSaga } from "../categories/category.saga";
import { userSaga } from "../user/use.saga";

export function* rootSaga() {
  yield* all([call(CategoriesSaga), call(userSaga)]);
}
