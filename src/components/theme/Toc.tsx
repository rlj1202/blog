'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const Toc: FC<{ headingElements: Element[] }> = ({ headingElements }) => {
  const [currentId, setCurrentId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (_entries) => {
        console.log('test', _entries);

        let index;
        for (index = 0; index < headingElements.length; index++) {
          const cur = headingElements[index];
          if (cur.getBoundingClientRect().y >= 128) {
            break;
          }
        }

        const element = headingElements[index - 1];

        setCurrentId(element?.id);
      },
      {
        root: null,
        threshold: 1.0,
        rootMargin: '-128px 0px 0px 0px',
      }
    );

    headingElements.forEach((headingElement) => {
      observer.observe(headingElement);
    });

    return () => {
      observer.disconnect();
    };
  }, [headingElements]);

  return (
    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-400">
      {headingElements.map((headingElement) => (
        <div
          key={headingElement.id}
          className={`
            ${
              currentId === headingElement.id
                ? 'font-bold text-gray-900 dark:text-gray-200'
                : ''
            }
            ${headingElement.nodeName === 'H3' ? 'ml-6' : ''}
            `}
        >
          <Link
            href={`#${headingElement.id}`}
            scroll={false}
            onClick={(_e) => {
              document
                .querySelector(`#${headingElement.id}`)
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {headingElement.textContent}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Toc;
