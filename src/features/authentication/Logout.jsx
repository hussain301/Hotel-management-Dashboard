/** @format */

import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogout } from '../authentication/useLogout';

import React from 'react';
import SpinnerMini from '../../ui/SpinnerMini';

const Logout = () => {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon
      disabled={isLoading}
      onClick={logout}
    >
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
