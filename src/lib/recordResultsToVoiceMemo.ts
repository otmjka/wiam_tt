import type { MemoRecord, RecResult } from '@/types';
import { getEmptyMemo } from './getEmptyMemo';

export const recordResultsToVoiceMemo = (recResults: RecResult): MemoRecord => {
  const newMemo = getEmptyMemo();
  const speach = recResults.speach.result;
  const audio = recResults.audio.result;
  return {
    ...newMemo,
    ...(speach ? { speach, description: speach } : {}),
    ...(audio ? { audio } : {}),
  };
};
