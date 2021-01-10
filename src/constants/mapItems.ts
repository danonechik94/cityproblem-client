import {User} from "../types/global";

export enum MapItemType {
  generalIssue = 0,
  crosswalkIssue = 1,
  suggestion = 99,
}

export const MAP_ITEM_TYPE_NAME = {
  [MapItemType.generalIssue]: 'generalIssue',
  [MapItemType.crosswalkIssue]: 'crosswalk',
  [MapItemType.suggestion]: 'suggestion',
};

export const MAP_ITEM_NAME_TEXT = {
  [MapItemType.generalIssue]: 'Общая проблема',
  [MapItemType.crosswalkIssue]: 'Перекрёсток',
  [MapItemType.suggestion]: 'Предложение',
};

export const mockMapItems: Issue[] = [
  {

    id: 'a1b61a96aac14c4f94c48dd861f49124',
    date_created: new Date(2021, 1, 9),
    description: 'На данном участке отсутствует пешеходная инфраструктура и постоянно происходят конфликты.',
    geo_feature: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          37.649878,
          54.194517
        ]
      }
    },
    title: 'Нет пешеходной инфраструктуры',
    category: MapItemType.generalIssue,
    user: {
      id: '0000111',
      email: 'danone1994@gmail.com',
      firstName: 'Павел',
      lastName: 'Корчевский',
    },
  },
  {
    id: 'b9ff93b9c1644329941393b8f4677b52',
    date_created: new Date(2021, 1, 9),
    description: 'Отсутствует пешеходный переход, хотя пешеходный поток на улице достаточно большой.',
    geo_feature: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          37.650847,
          54.194270
        ]
      }
    },
    title: 'Нет пешеходной инфраструктуры',
    category: MapItemType.crosswalkIssue,
    user: {
      id: '0000111',
      email: 'danone1994@gmail.com',
      firstName: 'Павел',
      lastName: 'Корчевский',
    },
  },
];