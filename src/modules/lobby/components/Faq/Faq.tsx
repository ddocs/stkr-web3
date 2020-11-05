import React, { SVGAttributes, useState } from 'react';
import classNames from 'classnames';
import { useFaqStyles } from './FaqStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body2, Headline1 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { uid } from 'react-uid';
import { FoldableSection } from '../../../../UiKit/FoldableSection';

interface IMarketingProps {
  className?: string;
}

const Arrow = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width={13} height={21} viewBox="0 0 13 21" fill="none" {...props}>
      <path d="M1 20l10-9.5L1 1" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
};

const FAQ: Record<string, string>[] = [
  {
    question: 'about.faq-question-1',
    answer: 'about.faq-answer-1',
  },
  {
    question: 'about.faq-question-2',
    answer: 'about.faq-answer-2',
  },
  {
    question: 'about.faq-question-3',
    answer: 'about.faq-answer-3',
  },
  {
    question: 'about.faq-question-4',
    answer: 'about.faq-answer-4',
  },
];

export const Faq = ({ className }: IMarketingProps) => {
  const classes = useFaqStyles();

  const [value, setValue] = useState<Record<string, string> | undefined>(
    FAQ[0],
  );

  return (
    <BackgroundColorProvider
      className={classNames(classes.component, className)}
      component="section"
    >
      <Curtains classes={{ root: classes.wrapper }}>
        <Headline1 className={classes.title} component="h2">
          {t('about.faq-title')}
        </Headline1>
        <ul className={classes.list}>
          {FAQ.map(item => {
            const visible = value === item;
            return (
              <li className={classes.item} key={uid(item)}>
                <p className={classes.question}>
                  <button onClick={() => setValue(item)}>
                    {t(item.question)}
                  </button>
                  <span
                    className={classNames(
                      classes.arrow,
                      visible && classes.rotate,
                    )}
                    onClick={() => setValue(item)}
                  >
                    <Arrow />
                  </span>
                </p>
                <FoldableSection open={visible} timeout={300} ssr={false}>
                  <Body2 className={classes.answer} component="div">
                    {tHTML(item.answer)}
                  </Body2>
                </FoldableSection>
              </li>
            );
          })}
        </ul>
      </Curtains>
    </BackgroundColorProvider>
  );
};
