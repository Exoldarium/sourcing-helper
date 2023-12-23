import { useState } from 'react';
import { parseError } from '../utils/parsingHelpers';

export const useCopyToClipboard = () => {
  const [text, setText] = useState<string | null>(null);

  const copyText = async (textToCopy: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API might not be supported');
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setText(textToCopy);
      return true;
    } catch (err) {
      setText(null);
      const error = parseError(err);
      throw new Error(error);
    }
  };

  return { text, copyText };
};