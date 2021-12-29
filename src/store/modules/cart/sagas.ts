import { AxiosResponse } from 'axios';
import { all, call, select, takeLatest, put } from 'redux-saga/effects';
import { IState } from '../..';
import { api } from '../../../services/api';
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';

interface IStockResponse {
  id: number;
  quantity: number;
}
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  })
  const avaiableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);
  if (avaiableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  }
  else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
])