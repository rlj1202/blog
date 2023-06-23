import { FC } from 'react';
import Link from 'next/link';

import GithubIcon from '../icons/GithubIcon';
import TwitterIcon from '../icons/TwitterIcon';
import MailIcon from '../icons/MailIcon';
import RSSIcon from '../icons/RSSIcon';

import Config from '@/config';

const Footer: FC = () => {
  return (
    <div className="my-24 text-xs text-gray-500 dark:text-gray-400">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-4">
          <span className="flex flex-row gap-2 items-center">
            <GithubIcon className="w-4 h-4" />
            <Link href={Config.author.contacts.github}>GitHub</Link>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <TwitterIcon className="w-4 h-4" />
            <Link href={Config.author.contacts.twitter}>Twitter</Link>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <MailIcon className="w-4 h-4" />
            <Link href={`mailto:${Config.author.contacts.email}`}>
              {Config.author.contacts.email}
            </Link>
          </span>
        </div>
        <div className="flex flex-row gap-x-4">
          <span className="flex flex-row gap-2 items-center">
            <RSSIcon className="w-4 h-4" />
            <Link href={Config.rss.rss2Path}>RSS 2.0</Link>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <RSSIcon className="w-4 h-4" />
            <Link href={Config.rss.atom1Path}>ATOM 1.0</Link>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <RSSIcon className="w-4 h-4" />
            <Link href={Config.rss.json1Path}>JSON 1.0</Link>
          </span>
        </div>
        <div>{Config.copyright}</div>
      </div>
    </div>
  );
};

export default Footer;
