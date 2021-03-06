/* eslint-disable no-plusplus */
import _ from 'lodash';

function realSortTagkvs(tagkvs, compareGetter) {
  return _.map(tagkvs, (o) => {
    if (!(o && o.tagv && o.tagv.length !== 0)) {
      return o;
    }

    o.tagv = o.tagv.sort((a, b) => {
      return compareGetter(a, b);
    });
    return o;
  });
}

export default function sortTagkvs(tagkvs) {
  if (!tagkvs) {
    return tagkvs;
  }

  let compareGetter = _.noop;
  try {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    compareGetter = collator.compare;
  } catch (e) {
    console.error(e);
  }
  return realSortTagkvs(tagkvs, compareGetter);
}
