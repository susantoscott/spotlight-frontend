import React from 'react';
import Collapsible, { ICollapsible } from './Collapsible';

interface IMainList {
  data: ICollapsible[];
}

const MainList: React.FC<IMainList> = ({ data }) => {
  const collapsibleItems = data.map((collapsible) => (
    <Collapsible
      logo={chrome.runtime.getURL(`${collapsible.logo}.png`)}
      section={collapsible.section}
      row={collapsible.row}
      price={collapsible.price}
      url={collapsible.url}
    />
  ));
  return <div>{collapsibleItems}</div>;
};

export default MainList;