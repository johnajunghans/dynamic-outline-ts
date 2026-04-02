import { Block } from './types';

export const findObjectById = (array: Block[], id: number): Block | null => { 
  let object: Block | undefined;
  const arrayLoop = (arr: Block[], id: number) => {
    if (arr) {
      for (let i=0; i < arr.length; i++) {
        if (object) return;
        if (arr[i].id === id) {
          object = arr[i];
          return;
        }
        arrayLoop(arr[i].children, id);
      }
    }
  };
  arrayLoop(array, id);
  if (object) {
    return object;
  }
  return null;
};

export const removeObjectById = (arr: Block[], id: number): Block[] | null => {
  const array = [...arr];
  let newArray: Block[] | undefined;
  const arrayLoop = (array: Block[], id: number) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (newArray) return;
        if (array[i].id === id) {
          newArray = array.filter(obj => obj.id !== id);
          return;
        }
        arrayLoop(array[i].children, id);
        if (newArray) {
          array[i].children = newArray;
          newArray = array;
        }
      }
    }
  };
  arrayLoop(array, id);
  if (newArray) {
    return newArray;
  }
  return null;
};

export const updateObjectDescriptionById = (arr: Block[], id: number, newText: string): Block[] | null => {
  const array = [...arr];
  let newArray: boolean | undefined;
  const arrayLoop = (array: Block[], id: number, newText: string) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (newArray) {
          return;
        }
        if (array[i].id === id) {
          array[i].description = newText;
          newArray = true;
        }
        arrayLoop(array[i].children, id, newText);
      }
    }
  };
  arrayLoop(array, id, newText);
  if (newArray) {
    return array;
  }
  return null;
};

export const insertObjectById = (arr: Block[], id: number, object: Block): Block[] | null => {
  const array = [...arr];
  let newArray: boolean | undefined;
  const arrayLoop = (array: Block[], id: number, object: Block) => {
    if (array) {
      for (let i=0; i < array.length; i++) {
        if (newArray) {
          return;
        } 
        if (array[i].id === id) {
          array[i].children.push(object);
          newArray = true;
          return;
        }
        arrayLoop(array[i].children, id, object);
      }
    }
  };
  arrayLoop(array, id, object);
  if (newArray) {
    return array;
  }
  return null;
};

export const reorderObjectById = (
  arr: Block[],
  sourceId: string,
  sourceIndex: number,
  destinationId: string,
  destinationIndex: number
): Block[] | null => {
  const array = [...arr];
  let sourceObj: Block | null = null;
  let isModified = false;

  const findSourceObj = (currentArray: Block[], id: string, index: number) => {
    if (!currentArray || sourceObj) return;

    if (id === 'ROOT') {
      sourceObj = currentArray.splice(index, 1)[0];
      return;
    }

    for (let i = 0; i < currentArray.length; i++) {
      if (sourceObj) return;
      if (`block-${currentArray[i].id}` === id) {
        sourceObj = currentArray[i];
        currentArray.splice(i, 1);
        return;
      }
      findSourceObj(currentArray[i].children, id, index);
    }
  };

  const insertSourceObj = (currentArray: Block[], id: string, index: number) => {
    if (!currentArray || isModified) return;

    if (id === 'ROOT') {
      currentArray.splice(index, 0, sourceObj!);
      isModified = true;
      return;
    }

    for (let i = 0; i < currentArray.length; i++) {
      if (isModified) return;
      if (`container-${currentArray[i].id}` === id) {
        currentArray[i].children.splice(index, 0, sourceObj!);
        isModified = true;
        return;
      }
      insertSourceObj(currentArray[i].children, id, index);
    }
  };

  findSourceObj(array, sourceId, sourceIndex);
  if (sourceObj) {
    insertSourceObj(array, destinationId, destinationIndex);
  }
  return isModified ? array : null;
};
