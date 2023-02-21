import React from 'react';
import styled from 'styled-components';

interface IItemCost {
  text: string;
  cost: number;
  color?: string;
  isBold?: boolean;
  margin?: string;
}

export default function ItemCost({
  text,
  cost,
  color = '#5f5f5f',
  isBold = false,
  margin = '2px 0',
}: IItemCost) {
  return (
    <ItemCostDiv>
      <Item textAlign="left" color={color} isBold={isBold} margin={margin}>
        {text}
      </Item>
      <Item textAlign="right" color={color} isBold={isBold} margin={margin}>
        ${cost.toFixed(2)}
      </Item>
    </ItemCostDiv>
  );
}

const ItemCostDiv = styled.div`
  display: flex;
`;

interface IItem {
  textAlign: string;
  color: string;
  isBold: boolean;
  margin: string;
}

const Item = styled.p<IItem>`
  font-size: 16px;
  font-family: Manrope;
  font-weight: ${(props) => (props.isBold ? 700 : 300)};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  width: 50%;
  text-align: ${(props) => props.textAlign};
`;
