import React, { useState } from 'react';
import { UserInfoType } from '../types/User';

const UserNamesContext = React.createContext<UserInfoType | null>(null);
const UserNamesUpdateContext = React.createContext<
  ((value: UserInfoType) => void) | null
>(null);

export const useUserNames = () => {
  const userNames = React.useContext(UserNamesContext);
  if (!userNames) {
    throw new Error('...');
  }
  return userNames;
};

export const useUserNamesUpdate = () => {
  const userNamesUpdate = React.useContext(UserNamesUpdateContext);
  if (!userNamesUpdate) {
    throw new Error('..');
  }
  return userNamesUpdate;
};

export const UserNamesProvider: React.FC = (props) => {
  const [userNames, setUserNames] = useState<UserInfoType>(() => {
    return {
      atcoderUserName: window.localStorage.getItem('lightBlue_atcoderUserName'),
      aizuUserName: window.localStorage.getItem('lightBlue_aizuUserName'),
    };
  });

  const updateUserNames = React.useCallback((value: UserInfoType) => {
    setUserNames(value);
    window.localStorage.setItem(
      'lightBlue_atcoderUserName',
      value.atcoderUserName ?? ''
    );
    window.localStorage.setItem(
      'lightBlue_aizuUserName',
      value.aizuUserName ?? ''
    );
  }, []);
  return (
    <UserNamesUpdateContext.Provider value={updateUserNames}>
      <UserNamesContext.Provider value={userNames}>
        {props.children}
      </UserNamesContext.Provider>
    </UserNamesUpdateContext.Provider>
  );
};
