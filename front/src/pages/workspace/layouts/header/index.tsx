import Menu from '@components/Menu';
import React, { FC, useCallback, useState } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { userAPI } from '@apis/users';
import { LogOutButton, ProfileImg, ProfileModal, RightMenu, Wrapper } from './styles';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  const navigate = useNavigate();

  const { data: user, isValidating: isUsersValidating, mutate } = useSWR<IUser>('/api/users', fetcher);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onLogout = useCallback(async () => {
    await userAPI.post.logout();
    await mutate();
    navigate('/login');
  }, [mutate, navigate]);

  return (
    <Wrapper>
      {user && (
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(user!.nickname, { s: '29px', d: 'retro' })} alt={user?.nickname} />
            {showUserMenu && (
              <Menu style={{ top: 38, right: 0 }} show={showUserMenu}>
                <ProfileModal>
                  <img
                    src={gravatar.url(user!.nickname, { d: 'retro' })}
                    alt={user?.nickname}
                    style={{ height: 36, width: 36 }}
                  />
                  <div style={{ lineHeight: '1.23463' }}>
                    <span id="profile-name">{user?.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>logout</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      )}
    </Wrapper>
  );
};

export default Header;
