import React from 'react';
import classNames from 'classnames';
import { useSocialStyles } from './SocialStyles';
import { uid } from 'react-uid';
import { NavLink } from '../../../../UiKit/NavLink';
import { SOCIAL_LINK } from '../../../../common/const';

const Twitter = (props: React.SVGAttributes<any>) => {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.62 7.08a8.9 8.9 0 01-2.547.697 4.436 4.436 0 001.948-2.454A8.888 8.888 0 0121.205 6.4a4.437 4.437 0 00-7.557 4.045A12.584 12.584 0 014.506 5.81c-.38.654-.6 1.416-.6 2.228 0 1.539.784 2.897 1.974 3.69a4.426 4.426 0 01-2.01-.554v.055a4.437 4.437 0 003.559 4.348 4.447 4.447 0 01-2.003.074 4.441 4.441 0 004.141 3.08 8.896 8.896 0 01-5.509 1.9c-.358 0-.71-.023-1.058-.061a12.552 12.552 0 006.8 1.993c8.157 0 12.618-6.757 12.618-12.618 0-.194-.003-.384-.013-.574a8.97 8.97 0 002.212-2.297l.004.006z"
        fill="currentColor"
      />
    </svg>
  );
};

const Telegram = (props: React.SVGAttributes<any>) => {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M4.92 12.837l17.517-6.754c.813-.294 1.523.198 1.26 1.427V7.51L20.716 21.56c-.22.997-.813 1.239-1.64.77l-4.543-3.348-2.19 2.11c-.243.243-.447.447-.917.447l.323-4.622 8.418-7.605c.366-.322-.082-.504-.565-.183l-10.403 6.55-4.484-1.4c-.974-.308-.995-.973.206-1.442z"
        fill="currentColor"
      />
    </svg>
  );
};

const Chat = (props: React.SVGAttributes<any>) => {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M15.51 14.487c0 2.695-2.164 4.88-4.834 4.88-2.67 0-4.834-2.185-4.834-4.88 0-2.694 2.164-4.879 4.834-4.879 2.67 0 4.834 2.185 4.834 4.88zM20.813 14.487c0 2.537-1.082 4.594-2.417 4.594-1.335 0-2.418-2.057-2.418-4.594 0-2.536 1.083-4.593 2.417-4.593 1.335 0 2.418 2.056 2.418 4.593M22.982 14.487c0 2.272-.38 4.115-.85 4.115s-.85-1.842-.85-4.115c0-2.272.38-4.115.85-4.115s.85 1.843.85 4.115z"
        fill="currentColor"
      />
    </svg>
  );
};

const SOCIAL_LIST = [
  {
    href: SOCIAL_LINK.twitter,
    title: 'twitter',
    icon: <Twitter />,
  },
  {
    href: SOCIAL_LINK.telegram,
    title: 'telegram',
    icon: <Telegram />,
  },
  {
    href: SOCIAL_LINK.chat,
    title: 'chat',
    icon: <Chat />,
  },
];

export const Social = ({ className }: { className?: string }) => {
  const classes = useSocialStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {SOCIAL_LIST.map(item => {
          return (
            <li key={uid(item)} className={classes.item}>
              <NavLink
                className={classes.link}
                href={item.href}
                title={item.title}
                color="secondary"
              >
                {item.icon}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
