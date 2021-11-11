const SORT_KEY = Symbol('SORT_KEY');

type Element<K extends PropertyKey> = Record<K, unknown>;

/**
 *  A list of elements sorted by the property K
 */
export type SortedList<K extends PropertyKey, T extends Element<K>> = T[] & {
  [SORT_KEY]: K;
};

function tagSortedList<K extends PropertyKey, T extends Element<K>>(
  k: K,
  list: T[],
): SortedList<K, T> {
  Object.defineProperty(list, SORT_KEY, { value: k });
  return list as SortedList<K, T>;
}

function compare(a: any, b: any): number {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}

/**
 *  Produce a SortedList
 *
 *  @param key the key to sort by
 *  @param ts the (unsorted) input array
 */
export function sortBy<K extends PropertyKey, T extends Element<K>>(
  key: K,
  list: T[],
): SortedList<K, T> {
  const sorted = list.slice();
  sorted.sort((a, b) => compare(a[key], b[key]));
  return tagSortedList<K, T>(key, sorted);
}

/**
 *  Test whether the list `ts` is sorted by the `key`
 */
export function isSortedBy<K extends PropertyKey, T extends Element<K>>(
  key: K,
  list: T[],
): list is SortedList<K, T> {
  return (list as SortedList<K, T>)[SORT_KEY] === key;
}

function sliceSorted<K extends PropertyKey, T extends Element<K>>(
  list: SortedList<K, T>,
  begin: number,
  end?: number,
): SortedList<K, T> {
  return tagSortedList(list[SORT_KEY], list.slice(begin, end));
}

/**
 * Return the slice of `items` between the specified keys
 *
 * @param list the list to slice
 * @param beginKey the key immediately preceding the first returned item
 * @param endKey the key immediately following the last returned item
 */
export function between<K extends PropertyKey, T extends Element<K>>(
  list: SortedList<K, T>,
  beginKey: T[K],
  endKey?: T[K],
): SortedList<K, T> {
  const sortKey = list[SORT_KEY];
  if (endKey && beginKey > endKey) {
    return tagSortedList(sortKey, []);
  }

  let begin = -1;
  let end = 0;
  for (end; end < list.length; end += 1) {
    const item = list[end];
    if (begin === -1 && compare(item[sortKey], beginKey) > 0) {
      begin = end;
    }

    if (endKey && compare(item[sortKey], endKey) > 0) {
      break;
    }
  }

  if (begin === -1) {
    end = -1;
  }

  return sliceSorted(list, begin, end);
}
