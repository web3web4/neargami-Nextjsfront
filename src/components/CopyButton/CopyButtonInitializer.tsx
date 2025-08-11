'use client';

import { useEffect } from 'react';

export default function CopyButtonInitializer() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.ql-syntax, .ql-code-block-container');

      codeBlocks.forEach((block) => {
        if (!(block instanceof HTMLElement)) return;
        if (block.querySelector('.copy-btn')) return;

        const button = document.createElement('button');
        button.innerText = '📋';
        button.className = 'copy-btn';

        button.onclick = () => {
        const clone = block.cloneNode(true) as HTMLElement;
        const btnInClone = clone.querySelector('.copy-btn');
        if (btnInClone) btnInClone.remove();

        const textToCopy = clone.innerText || '';
        navigator.clipboard.writeText(textToCopy);

        button.innerText = '✅';
        setTimeout(() => (button.innerText = '📋'), 1500);
        };


        block.style.position = 'relative';
        block.insertBefore(button, block.firstChild);
      });
    };

    addCopyButtons();

    const observer = new MutationObserver(() => {
      addCopyButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}