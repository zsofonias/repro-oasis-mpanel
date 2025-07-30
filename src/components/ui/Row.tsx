import styled, { css } from 'styled-components';

type Props = {
  type: 'horizontal' | 'vertical';
};

const Row = styled.div<Props>`
  display: flex;

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
