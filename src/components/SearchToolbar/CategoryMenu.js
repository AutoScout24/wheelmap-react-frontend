// @flow

import React from 'react';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';
import Categories from '../../lib/Categories';

const Container = styled.div`
  flex-flow: row wrap;
  display: flex;
  z-index: 1000;
  top: 50px;
  width: 100%;
  margin-bottom: 10px;
  > * {
    flex: 80px;
    @media (max-width: 320px) {
      flex: 60px;
    }
  }
`;


type Props = {
  hidden: boolean,
  onFocus: (() => void),
  onBlur: (() => void),
};


export default function CategoryMenu(props: Props) {
  const names = Categories.getTranslatedRootCategoryNames();

  const lastIndex = Object.keys(names).length - 1;
  return (
    <Container className="category-menu">
      {Object.keys(names).map((id, index) => (<CategoryButton
        hidden={props.hidden}
        onFocus={props.onFocus}
        onKeyDown={({nativeEvent}) => {
          const tabPressedOnLastButton = index === lastIndex && nativeEvent.key === 'Tab' && !nativeEvent.shiftKey;
          const shiftTabPressedOnFirstButton = index === 0 && nativeEvent.key === 'Tab' && nativeEvent.shiftKey;
          if(tabPressedOnLastButton || shiftTabPressedOnFirstButton) {
            props.onBlur();
          }
        }}
        key={id}
        className="category-button"
        name={names[id]}
        id={id}
      />))}
    </Container>
  );
}
