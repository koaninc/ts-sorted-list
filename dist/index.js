"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = exports.isSortedBy = exports.sortBy = void 0;
const SORT_KEY = Symbol('SORT_KEY');
function tagSortedList(k, list) {
    Object.defineProperty(list, SORT_KEY, { value: k });
    return list;
}
function compare(a, b) {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
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
function sortBy(key, list) {
    const sorted = list.slice();
    sorted.sort((a, b) => compare(a[key], b[key]));
    return tagSortedList(key, sorted);
}
exports.sortBy = sortBy;
/**
 *  Test whether the list `ts` is sorted by the `key`
 */
function isSortedBy(key, list) {
    return list[SORT_KEY] === key;
}
exports.isSortedBy = isSortedBy;
function sliceSorted(list, begin, end) {
    return tagSortedList(list[SORT_KEY], list.slice(begin, end));
}
/**
 * Return the slice of `items` between the specified keys
 *
 * @param list the list to slice
 * @param beginKey the key immediately preceding the first returned item
 * @param endKey the key immediately following the last returned item
 */
function between(list, beginKey, endKey) {
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
exports.between = between;
//# sourceMappingURL=index.js.map