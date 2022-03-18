export const flexSet = ({ align, justify, direction, wrap }: IFlexSet) => `
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;

export interface IFlexSet {
  align?: 'start' | 'end' | 'center';
  justify?: 'start' | 'end' | 'center' | 'space-between';
  direction?: 'column' | 'row';
  wrap?: 'wrap';
}
