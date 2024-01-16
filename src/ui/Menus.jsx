import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

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

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
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


const MenusContext = createContext()

const Menus = ({children}) => {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)
  
  const close = () => setOpenId('')

  const open = setOpenId


  return <MenusContext.Provider value={{openId,close ,open,position,setPosition}}>
          {children}
  </MenusContext.Provider>
 
  
}
/**
 * Renders a toggle button that opens a menu when clicked.
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the toggle button.
 * @returns {JSX.Element} - The Toggle component.
 */
/**
 * Renders a toggle button component.
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the toggle button.
 * @returns {JSX.Element} - The Toggle component.
 */
const Toggle = ({ id }) => {
  const {openId,open,close,setPosition} = useContext(MenusContext)

  /**
   * Handles the click event of the toggle button.
   * @param {Object} e - The click event object.
   */
  function handleClick(e) {
    e.stopPropagation()
    const rect = e.target.closest('button').getBoundingClientRect()
    setPosition({
      x: window.innerWidth - rect.width - rect.x+20,
      y: rect.height + rect.y + 8,
    })
    openId === '' || openId !== id ? open(id) : close()
    
  }

  return <StyledToggle onClick={handleClick}>
    <HiEllipsisVertical/>
    </StyledToggle>
}

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext)
  const {ref} = useOutsideClick(close,false)
  if (openId !== id) return null

  return createPortal( <StyledList position={position} ref={ref}>
    {children}
  </StyledList>,document.body)


 } 

const Button = ({ children, icon, onClick }) => { 
  const { close } = useContext(MenusContext)
  function handleClick() {
    onClick?.()
    close()
  }

  return <li>
    <StyledButton onClick={handleClick}>
      {icon} 
      <span>
      {children}
      </span>
    </StyledButton>
  </li>
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button



export default Menus