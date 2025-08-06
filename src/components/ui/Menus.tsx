import { useOutsideElementClick } from '@/hooks/useOutsideElementClick';
import {
  createContext,
  useContext,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  position?: {
    x: number;
    y: number;
  };
};
const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenuContext {
  openId: string;
  position?: {
    x: number;
    y: number;
  };
  setPosition: (position: { x: number; y: number }) => void;
  open: (id: string) => void;
  close: () => void;
}

const MenusContext = createContext<IMenuContext>({
  openId: '',
  position: undefined,
  setPosition: () => {},
  open: () => {},
  close: () => {},
});

type MenusProps = {
  children: ReactNode;
};

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  function open(id: string) {
    setOpenId(id);
  }

  function close() {
    setOpenId('');
  }

  return (
    <MenusContext.Provider
      value={{ openId, position, setPosition, open, close }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type ToggleProps = {
  id: string;
};

function Toggle({ id }: ToggleProps) {
  const { openId, setPosition, open, close } = useContext(MenusContext);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    // const rect = (e.target as HTMLButtonElement)
    //   .closest('button')
    //   ?.getBoundingClientRect();
    const target = e.target as HTMLButtonElement;
    const button = target.closest('button');
    const rect = button?.getBoundingClientRect();

    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === id) close();
    else open(id);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListProps = {
  id: string;
  children: ReactNode;
};

function List({ id, children }: ListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideElementClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

function Button({ children, icon, onClick }: ButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
