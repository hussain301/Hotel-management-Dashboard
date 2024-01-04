/** @format */

import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

import React from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon
          onClick={() => {
            navigate('/account');
          }}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
