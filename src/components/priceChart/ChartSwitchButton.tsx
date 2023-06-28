import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0.5rem;
  margin: 0.25rem;
  font-size: 1.25rem;
  color: white;
  border: none;
  width: 3rem;
  background: #0063f5;
  border-radius: 0.5rem;
  &:disabled {
    opacity: 0.5;
  }
`;

const ChartSwitchButton = ({ timeline, setTimeline, newTimeline }) => {
  return (
    <Button
      disabled={timeline === newTimeline ? true : false}
      onClick={() => setTimeline(newTimeline)}
    >
      {newTimeline}
    </Button>
  );
};

export default ChartSwitchButton;
