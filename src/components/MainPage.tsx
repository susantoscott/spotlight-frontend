import React, { useState } from 'react';
import styled from 'styled-components';

import TicketInfo from '../lib/types/ticketInfo';
import { FilterOptions, SortByOptions } from '../lib/types/options';
import stateToAbbreviation from '../lib/constants/stateToAbbreviation';

import Options from './options/Options';
import ResultsList from './ResultsList';
import Checking from './loading/Checking';
import Progress from './loading/Progress';
import Skeletons from './loading/Skeletons';
import BestDeal from './loading/BestDeal';

interface IAppBox {
  tagIsOpened: boolean;
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  srcTicketInfo: TicketInfo;
  destTickets: TicketInfo[];
  hasOneGoodResult: boolean;
  hasProcessedAll: boolean;
}

export default function AppBox({
  tagIsOpened,
  setTagIsOpened,
  destTickets,
  srcTicketInfo,
  hasOneGoodResult,
  hasProcessedAll,
}: IAppBox) {
  const [isDoneWithProgressBar, setIsDoneWithProgressBar] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(null);
  const [sortByOptions, setSortByOptions] = useState<SortByOptions>(null);
  return (
    <AppBoxDiv isVisible={tagIsOpened}>
      <Logo>spotlight</Logo>
      <XButton setTagIsOpened={setTagIsOpened} />

      {srcTicketInfo && <EventTitle ticket={srcTicketInfo} />}

      <Divider />

      <Progress
        isDoneWithProgressBar={isDoneWithProgressBar}
        setIsDoneWithProgressBar={setIsDoneWithProgressBar}
        hasProcessedAll={hasProcessedAll}
      />

      {hasProcessedAll && hasOneGoodResult && (
        <Options
          isReady={isDoneWithProgressBar && hasOneGoodResult}
          sortByOptions={sortByOptions}
          setFilterOptions={setFilterOptions}
          setSortByOptions={setSortByOptions}
        />
      )}

      {!hasProcessedAll && <Checking />}

      {!hasProcessedAll && !hasOneGoodResult && <Skeletons />}

      <ResultsList
        srcTicket={srcTicketInfo}
        destTickets={destTickets}
        options={{
          filterOptions: filterOptions,
          sortByOptions: sortByOptions,
        }}
        hasProcessedAll={hasProcessedAll}
      />

      {!hasOneGoodResult && isDoneWithProgressBar && (
        <BestDeal setTagIsOpened={setTagIsOpened} />
      )}
    </AppBoxDiv>
  );
}

const AppBoxDiv = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 698px;
  top: 13px;
  width: 573px;
  height: 604px;
  border-radius: 10.6px;
  background-color: #ffffff;
  z-index: 100;
  padding: 20px 32px;
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.26));
  overflow: hidden;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Logo = styled.h1`
  font-size: 30px;
  font-family: Mont;
  font-weight: 800;
  color: #4b3bff;
  letter-spacing: -0.03em;
  margin: 8px auto 0;
`;

interface IEventTitle {
  ticket: TicketInfo;
}

function EventTitle({ ticket }: IEventTitle) {
  return (
    <TitleDiv>
      <Teams>
        {ticket.seatInfo.isAssigned
          ? `${ticket.actor1} vs. ${ticket.actor2}`
          : `${ticket.actor1}`}
      </Teams>
      <Venue>
        {ticket.venueInfo.stadium} · {ticket.venueInfo.city},{' '}
        {stateToAbbreviation(ticket.venueInfo.state)} · {ticket.timeInfo.day},{' '}
        {ticket.timeInfo.date} at {ticket.timeInfo.hour}
      </Venue>
    </TitleDiv>
  );
}

const TitleDiv = styled.div`
  margin: 20px 0 0 0;
`;

const Teams = styled.h2`
  font-size: 20px;
  font-family: HelveticaNeue;
  font-weight: 500;
  margin: 0 0 0.8px 0;
`;

const Venue = styled.h4`
  font-size: 16px;
  font-family: HelveticaNeue;
  font-weight: 300;
  white-space: nowrap;
  overflow-x: scroll;
`;

const Divider = styled.div`
  height: 1.5px;
  border-radius: 3px;
  background-color: #dfe0e0;
  margin: 15px auto -3px;
`;

interface IXButton {
  setTagIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function XButton({ setTagIsOpened }: IXButton) {
  return (
    <XButtonContainer onClick={() => setTagIsOpened(false)}>
      <Image src={chrome.runtime.getURL('imgs/X Button.svg')} />
    </XButtonContainer>
  );
}

const XButtonContainer = styled.button`
  position: absolute;
  top: 4%;
  right: 3%;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px;
  :hover {
    background-color: #f1f1f1;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
`;
