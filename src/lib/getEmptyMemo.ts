import type { MemoRecord, MemoId } from '@/types';

import generateNewTitle from './generateNewTitle';

export const getEmptyMemo = (): MemoRecord => {
  return {
    id: String(Date.now()) as MemoId,
    title: generateNewTitle(),
    tokens: [],
    description: '',
    speach: null,
    audio: null,
  };
};
