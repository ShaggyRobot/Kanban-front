import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../Rtk/Api/usersApi';

function UserDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const login = localStorage.getItem('login');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const entries = ['token', 'login', 'userId'];
    entries.forEach((entry) => localStorage.removeItem(entry));
    navigate('/');
  };

  const handleDelete = async () => {
    const user = users?.find((user) => user.login === login);
    user && deleteUser(user.id);
    handleLogOut();
  };

  return (
    <div>
      <Button
        id="user-dashboard"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {login}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        <MenuItem color="error" onClick={handleDelete}>
          !!!DELETE!!!
        </MenuItem>
      </Menu>
    </div>
  );
}
export { UserDashboard };
