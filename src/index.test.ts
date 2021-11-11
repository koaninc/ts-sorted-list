import assert from 'assert';

import { sortBy, between, SortedList, isSortedBy } from './index';

type Element = { id: string; createdAt: string };

const elements: Element[] = [
  { id: 'A1', createdAt: '2019-04-01' },
  { id: 'A2', createdAt: '2019-04-03' },
  { id: 'B1', createdAt: '2019-04-04' },
  { id: 'B2', createdAt: '2019-04-09' },
  { id: 'C1', createdAt: '2019-04-11' },
];

const TEST_ELEMENTS: SortedList<'createdAt', Element> = sortBy(
  'createdAt',
  elements,
);

type Period = {
  startDate: string;
  endDate: string;
};

function expectBetween(period: Period, ids: string[]) {
  return function () {
    const actual = between(TEST_ELEMENTS, period.startDate, period.endDate);
    assert.deepEqual(
      actual.map((a) => a.id),
      ids,
    );
  };
}

const TESTS = {
  test_isSortedBy() {
    // @ts-ignore missing key
    assert.ok(!isSortedBy('foobar', TEST_ELEMENTS));
    assert.ok(isSortedBy('createdAt', TEST_ELEMENTS));
  },
  test_1: expectBetween(
    {
      startDate: '2019-03-27',
      endDate: '2019-04-03',
    },
    ['A1', 'A2'],
  ),
  test_2: expectBetween(
    {
      startDate: '2019-04-03',
      endDate: '2019-04-10',
    },
    ['B1', 'B2'],
  ),
  test_3: expectBetween(
    {
      startDate: '2019-04-10',
      endDate: '2019-04-17',
    },
    ['C1'],
  ),
};

const errors: [string, Error][] = [];
const skipped: string[] = [];

Object.entries(TESTS).forEach(function ([name, impl]) {
  if (name[0] === '_') {
    skipped.push(name);
    return;
  }

  try {
    impl();
  } catch (e) {
    errors.push([name, e as Error]);
    console.log(name, 'failed with error', e);
  }
});

if (errors.length > 0) {
  console.log('Failed with', errors.length, 'error(s)');
  process.exit(1);
}

if (skipped.length > 0) {
  console.log('Skipped', skipped.length, 'tests:\n -', skipped.join('\n - '));
}
