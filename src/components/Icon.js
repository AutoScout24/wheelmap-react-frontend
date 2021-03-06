// @flow

import styled from 'styled-components';
import * as React from 'react';
import type { NodeProperties, YesNoLimitedUnknown } from '../lib/Feature';
import getIconNameForProperties from './Map/getIconNameForProperties';
import colors from '../lib/colors';
import * as icons from './icons/categories';
import * as markers from './icons/markers';

type Size = 'big' | 'medium' | 'small';


type Props = {
  accessibility: YesNoLimitedUnknown,
  properties: ?NodeProperties,
  category: Category,
  className: ?string,
  size: Size,
  withArrow: ?boolean,
  shadowed: ?boolean,
  ariaHidden: ?boolean,
};


function width(size: Size) {
  return {
    big: 60,
    medium: 40,
    small: 25,
  }[size];
}


const StyledIconContainer = styled('figure')`
  position: relative;
  margin: 0;

  width: ${props => width(props.size)}px;
  height: ${props => width(props.size)}px;
  font-size: ${props => width(props.size)}px;
  line-height: 1;

  svg {
    position: absolute;
    &.background {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      g, polygon, path, circle, rect {
        fill: ${props => (colors.markers.background[props.accessibility])};
      }
    }
    &.icon {
      width: 60%;
      height: 60%;
      top: 20%;
      left: 20%;
      g, polygon, path, circle, rect {
        fill: ${props => (colors.markers.foreground[props.accessibility])};
      }
    }
  }
`;


export default function Icon({
  accessibility,
  properties,
  category,
  className,
  size,
  withArrow,
  shadowed,
  ariaHidden,
}: Props) {
  // TODO Taner: unsure if this is a clean way to do this
  const categoryName = properties
    ? getIconNameForProperties(properties)
    : category._id === '2nd_hand' ? 'second_hand' : category._id;
  const CategoryIconComponent = icons[categoryName || 'undefined'] || null;
  const MarkerComponent = markers[`${accessibility}${withArrow ? 'With' : 'Without'}Arrow`];

  return (
    <StyledIconContainer
      size={size}
      className={className}
      aria-hidden={ariaHidden}
      accessibility={accessibility}
    >
      {MarkerComponent ? <MarkerComponent className="background" /> : null}
      {CategoryIconComponent ? <CategoryIconComponent className="icon"/> : null}
    </StyledIconContainer>
  );
}
