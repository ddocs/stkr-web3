import React, { useState } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import cn from 'classnames';

import { FoldableSection } from '../../../../UiKit/FoldableSection';

import { useStyles } from './Styles';

interface FAQItemProps {
  question: string;
  answer: React.ReactElement;
}

const FOLDING_TIME = 300;

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleAnswer = () => setIsOpened(v => !v);

  return (
    <div className={classes.container}>
      <div className={classes.header} onClick={handleToggleAnswer}>
        <div className={classes.question}>{question}</div>
        <ArrowForwardIosIcon
          className={cn(classes.arrow, { [classes.arrowDown]: isOpened })}
        />
      </div>
      <FoldableSection open={isOpened} timeout={FOLDING_TIME} ssr={false}>
        <div className={classes.answer}>{answer}</div>
      </FoldableSection>
    </div>
  );
};

export default FAQItem;
