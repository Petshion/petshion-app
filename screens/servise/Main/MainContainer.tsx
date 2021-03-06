import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {mainApi} from '../../../api';
import {ListItem} from '../../../assets/types';

import {useSelector} from 'react-redux';
import {authSelector, filterSelector} from '../../../modules/hooks';
import {FilterItem} from '../../../modules/filter';

import MainPresenter from './MainPresenter';

interface ListItemsState {
  loading: boolean;
  getListItems: ListItem[];
  getListItemsError?: any;
}

export default () => {
  const {AUTHItem} = useSelector(authSelector);
  const {filter} = useSelector(filterSelector);
  const [listItems, setListItems] = useState<ListItemsState>({
    loading: true,
    getListItems: [],
    getListItemsError: null,
  });

  const getData = async () => {
    const [getListItems, getListItemsError] = await mainApi.listItems();
    if (getListItemsError) return;
    setListItems({
      loading: false,
      getListItems,
      getListItemsError,
    });
  };

  const updateData = async (filter: FilterItem) => {
    const [getListItems, getListItemsError] = await mainApi.search({
      color: filter.color,
      size: filter.size,
      kind: filter.kind,
    });
    if (getListItemsError) return;
    setListItems({
      loading: false,
      getListItems,
      getListItemsError,
    });
  };

  const getUpdateData = () => {
    if (
      filter.color.length === 0 &&
      filter.size.length === 0 &&
      filter.kind.length === 0
    ) {
      getData();
    } else {
      updateData(filter);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    console.log(filter);
    getUpdateData();
  }, [filter]);

  return <MainPresenter refreshFn={getUpdateData} {...listItems} />;
};
