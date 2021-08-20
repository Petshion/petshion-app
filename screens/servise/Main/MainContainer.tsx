import React, {useEffect, useState} from 'react';

import {mainApi} from '../../../api';
import {ListItem} from '../../../assets/types';

import {useSelector} from 'react-redux';
import {filterSelector} from '../../../modules/hooks';
import {FilterItem} from '../../../modules/filter';

import MainPresenter from './MainPresenter';

interface ListItemsState {
  loading: boolean;
  getListItems: ListItem[];
  getListItemsError?: any;
}

export default () => {
  const {filter} = useSelector(filterSelector);
  const [listItems, setListItems] = useState<ListItemsState>({
    loading: true,
    getListItems: [],
    getListItemsError: null,
  });

  const getData = async () => {
    const [getListItems, getListItemsError] = await mainApi.listItems();
    setListItems({
      loading: false,
      getListItems,
      getListItemsError,
    });
  };

  const updateData = async (filter: FilterItem) => {
    const [getListItems, getListItemsError] = await mainApi.search({
      color: filter.color.join(','),
      size: filter.size.join(','),
      kind: filter.kind.join(','),
    });
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
    getUpdateData();
  }, [filter]);

  if (listItems.loading === true) {
    return <></>;
  }
  return <MainPresenter refreshFn={getUpdateData} {...listItems} />;
};
