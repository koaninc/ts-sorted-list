declare const SORT_KEY: unique symbol;
declare type Element<K extends PropertyKey> = Record<K, unknown>;
/**
 *  A list of elements sorted by the property K
 */
export declare type SortedList<K extends PropertyKey, T extends Element<K>> = T[] & {
    [SORT_KEY]: K;
};
/**
 *  Produce a SortedList
 *
 *  @param key the key to sort by
 *  @param ts the (unsorted) input array
 */
export declare function sortBy<K extends PropertyKey, T extends Element<K>>(key: K, list: T[]): SortedList<K, T>;
/**
 *  Test whether the list `ts` is sorted by the `key`
 */
export declare function isSortedBy<K extends PropertyKey, T extends Element<K>>(key: K, list: T[]): list is SortedList<K, T>;
/**
 * Return the slice of `items` between the specified keys
 *
 * @param list the list to slice
 * @param beginKey the key immediately preceding the first returned item
 * @param endKey the key immediately following the last returned item
 */
export declare function between<K extends PropertyKey, T extends Element<K>>(list: SortedList<K, T>, beginKey: T[K], endKey?: T[K]): SortedList<K, T>;
export {};
