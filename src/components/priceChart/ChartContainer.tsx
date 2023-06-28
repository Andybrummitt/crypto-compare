import React, { useState } from 'react';
import ChartSwitchButton from './ChartSwitchButton';
import PriceChart from './PriceChart';
import styled from 'styled-components';

export type Timeline = 1 | 7 | 14 | 30 | 365 | 'max';

const Div = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 0.5rem;
    @media screen and (min-width: 1000px) {
      display: inline-block;
      width: 100%;
    }
  }
`;

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const InnerContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const ChartContainer = () => {
  const [timeline, setTimeline] = useState<Timeline>(30);

  const getTimelineSuffix = (timeline) => {
    if (timeline === 1) {
      return ' day';
    }
    return ' days';
  };

  return (
    <Container>
      <h2>
        Price Chart ({timeline.toString().concat(getTimelineSuffix(timeline))})
      </h2>
      <InnerContainer>
        <PriceChart timeline={timeline} />
        <div>
          <h3>Timeline (days)</h3>
          <Div>
            <ChartSwitchButton
              timeline={timeline}
              setTimeline={setTimeline}
              newTimeline={1}
            />
            <ChartSwitchButton
              timeline={timeline}
              setTimeline={setTimeline}
              newTimeline={7}
            />
            <ChartSwitchButton
              timeline={timeline}
              setTimeline={setTimeline}
              newTimeline={14}
            />
            <ChartSwitchButton
              timeline={timeline}
              setTimeline={setTimeline}
              newTimeline={30}
            />
            <ChartSwitchButton
              timeline={timeline}
              setTimeline={setTimeline}
              newTimeline={365}
            />
          </Div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default ChartContainer;
