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