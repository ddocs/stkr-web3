import classNames from 'classnames';
import React, { SVGAttributes, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { ABOUT_AETH_PATH } from '../../../../common/const';
import { Milliseconds } from '../../../../common/types';
import { t, tHTMLWithRouter } from '../../../../common/utils/intl';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Curtains } from '../../../../UiKit/Curtains';
import { FoldableSection } from '../../../../UiKit/FoldableSection';
import { Body2, Headline1 } from '../../../../UiKit/Typography';
import { useFaqStyles } from './FaqStyles';

const Arrow = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width={13} height={21} viewBox="0 0 13 21" fill="none" {...props}>
      <path d="M1 20l10-9.5L1 1" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
};

const FAQ: Record<string, string>[] = [
  {
    question: 'faq.question-1',
    answer: 'faq.answer-1',
  },
  {
    question: 'faq.question-2',
    answer: 'faq.answer-2',
  },
  {
    question: 'faq.question-3',
    answer: 'faq.answer-3',
  },
  {
    question: 'faq.question-4',
    answer: 'faq.answer-4',
  },
  {
    question: 'faq.question-5',
    answer: 'faq.answer-5',
  },
  {
    question: 'faq.question-6',
    answer: 'faq.answer-6',
  },
  {
    question: 'faq.question-7',
    answer: 'faq.answer-7',
  },
  {
    question: 'faq.question-8',
    answer: 'faq.answer-8',
  },
  {
    question: 'faq.question-9',
    answer: 'faq.answer-9',
  },
  {
    question: 'faq.question-10',
    answer: 'faq.answer-10',
  },
];
interface IFaqProps {
  className?: string;
}

const foldingAnimationTime: Milliseconds = 300;

export const Faq = ({ className }: IFaqProps) => {
  const classes = useFaqStyles();

  const [value, setValue] = useState<Record<string, string> | undefined>(
    FAQ[0],
  );

  const items = useMemo(
    () =>
      FAQ.map(item => {
        const isActive = value === item;
        const onQuestionClick = () => setValue(item);
        const onArrowClick = () => {
          if (value !== item) return setValue(item);
          else return setValue(undefined);
        };

        return (
          <li className={classes.item} key={uid(item)}>
            <p className={classes.question}>
              <button onClick={onQuestionClick}>{t(item.question)}</button>
              <span
                className={classNames(
                  classes.arrow,
                  isActive && classes.rotate,
                )}
                onClick={onArrowClick}
              >
                <Arrow />
              </span>
            </p>
            <FoldableSection
              open={isActive}
              timeout={foldingAnimationTime}
              ssr={false}
            >
              <Body2 className={classes.answer}>
                {tHTMLWithRouter(item.answer, {
                  aETHLink: ABOUT_AETH_PATH,
                })}
              </Body2>
            </FoldableSection>
          </li>
        );
      }),
    [
      classes.answer,
      classes.arrow,
      classes.item,
      classes.question,
      classes.rotate,
      value,
    ],
  );

  return (
    <BackgroundColorProvider
      className={classNames(classes.root, className)}
      component="section"
    >
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 className={classes.title} component="h2">
          {t('faq.title')}
        </Headline1>

        <ul className={classes.list}>{items}</ul>
      </Curtains>
    </BackgroundColorProvider>
  );
};
