import {createSlice} from '@reduxjs/toolkit';

export interface BasketItemState {
  _id: string;
  product_id: string;
  title: string;
  thumbnail_image: string;
  color: string;
  size: string;
  count: number;
  price: number;
  checked: boolean;
}

export interface BasketState {
  baskets: BasketItemState[];
}

const initialState: BasketState = {
  baskets: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    insert: (state, {payload: loadBaskets}) => {
      state.baskets = loadBaskets;
    },
    allSelect: state => {
      state.baskets.map(baskets => {
        baskets.checked = true;
      });
    },
    allDisSelect: state => {
      state.baskets.map(baskets => {
        baskets.checked = false;
      });
    },
    toggleSelect: (state, {payload: id}) => {
      const index = state.baskets.findIndex(basket => basket._id === id);
      state.baskets[index].checked = !state.baskets[index].checked;
    },
    minusCount: (state, {payload: id}) => {
      const index = state.baskets.findIndex(basket => basket._id === id);
      if (state.baskets[index].count === 1) {
        return;
      }
      state.baskets[index].count = state.baskets[index].count - 1;
    },
    plusCount: (state, {payload: id}) => {
      const index = state.baskets.findIndex(basket => basket._id === id);
      state.baskets[index].count = state.baskets[index].count + 1;
    },
    remove: (state, {payload: id}) => {
      const index = state.baskets.findIndex(basket => basket._id === id);
      state.baskets.splice(index, 1);
    },
    orderRemove: state => {
      for (let i = 0; i < state.baskets.length; i++) {
        if (state.baskets[i].checked === true) {
          state.baskets.splice(i, 1);
          i--;
        }
      }
    },
  },
});

export const {
  insert,
  allSelect,
  allDisSelect,
  toggleSelect,
  minusCount,
  plusCount,
  remove,
  orderRemove,
} = basketSlice.actions;

export default basketSlice.reducer;
