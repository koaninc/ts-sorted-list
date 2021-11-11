# ts-sorted-list

Implements a (typesafe) sorted list

## Creating a sorted list

```ts
import * as List from 'ts-sorted-list';

const sorted = List.sortBy('createdAt', [
  { id: 'A1', createdAt: '2019-04-01' },
  { id: 'A2', createdAt: '2019-04-03' },
  { id: 'B1', createdAt: '2019-04-04' },
  { id: 'B2', createdAt: '2019-04-09' },
  { id: 'C1', createdAt: '2019-04-11' },
]);
```

Then test whether the list is sorted:

```ts
List.isSortedBy('createdAt', sorted); // true
List.isSortedBy('foobar', sorted); // false
```

Or efficiently retrieve a slice of the list:

```ts
const slice = List.slice(sorted, '2019-03-27', '2019-04-03');
slice.map(t => t.id) // ['A1', 'A2']
```

# License

ISC
