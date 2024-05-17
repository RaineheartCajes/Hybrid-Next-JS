// import { AppThunk } from '../index';
// import axios from 'axios';
// import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../../redux/reducer/productReducer';

// export const fetchProducts = (): AppThunk => async (dispatch) => {
//   dispatch(fetchProductsRequest());
//   try {
//     const response = await axios.get('http://localhost:2000/table/getProducts');
//     dispatch(fetchProductsSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchProductsFailure(error.message));
//   }
// };