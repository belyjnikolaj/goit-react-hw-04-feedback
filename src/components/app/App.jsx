import css from './App.module.css';
import { useState } from 'react';
import FeedbackOptions from 'components/feedbackOptions';
import Statistics from 'components/statistics';
import Section from 'components/section';
import Notification from 'components/notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackOptions = [
    { option: 'good', count: good },
    { option: 'neutral', count: neutral },
    { option: 'bad', count: bad }
  ];

  const handleClickIncrement = (type) => {        
    if (type === 'good') {
      setGood((prevGood) => prevGood + 1);
    } else if (type === 'neutral') {
      setNeutral((prevNeutral) => prevNeutral + 1);
    } else if (type === 'bad') {
      setBad((prevBad) => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

  

  const totalFeedback = countTotalFeedback();

  return (
    <div className={css['app_container']}>
      <Section title="Please leave feedback">
        <div className={css['btn__conteiner']}>
          <ul className={css['btn__list']}>
            {feedbackOptions.map(({ option }) => (
              <FeedbackOptions
                key={option}
                option={option}
                handleClickIncrement={handleClickIncrement}
              />
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Statistics">
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <div className={css['statistics__conteiner']}>
            <ul className={css['statistics__list']}>
              {feedbackOptions.map(({ option, count }) => (
                <Statistics key={option} option={option} count={count} />
              ))}
              <li className={css['statistics__item']}>
                <p className={css['statistics__item-text']}>
                  Total: {totalFeedback}
                </p>
              </li>
              <li className={css['statistics__item']}>
                <p className={css['statistics__item-text']}>
                  Positive Feedback: {countPositiveFeedbackPercentage()}%
                </p>
              </li>
            </ul>
          </div>
        )}
      </Section>
    </div>
  );
};

export default App;
