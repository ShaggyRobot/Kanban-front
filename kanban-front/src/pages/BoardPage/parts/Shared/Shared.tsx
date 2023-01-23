import React, { useEffect, useState } from 'react';

import { Button, Divider, IconButton, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import { IBoardDTO, IBoardFaceDTO, useGetUserQuery, useUpdateBoardMutation } from '@Rtk';

import styles from './shared.module.scss';

interface IProps {
  board?: IBoardDTO;
}

function Shared(props: IProps): JSX.Element {
  const { board } = props;

  const currentUserId = localStorage.getItem('userId') || '';

  const [shared, setShared] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const [updateBoard] = useUpdateBoardMutation();

  const { data: boardOwner } = useGetUserQuery({ id: board!.userId });

  const boardOwnerLogin = boardOwner?.id === currentUserId ? 'You' : boardOwner?.login;

  useEffect(() => {
    board && setShared(board.sharedWith.map((user) => user.login));
  }, [board]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const removeUser = (user: string): void => {
    setShared(shared.filter((sharedUser) => sharedUser !== user));
  };

  const addUser = (): void => {
    const user = input;
    if (user && !shared.includes(user)) {
      setShared([...shared, user]);
      setInput('');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    console.log(board);

    try {
      const res = (await updateBoard({
        boardId: board!.id,
        body: {
          title: board!.title,
          description: board!.description,
          sharedWith: shared,
        },
      })) as { data: IBoardFaceDTO };

      setShared(res.data.sharedWith.map((user) => user.login));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.shared}>
        <div className={styles.shared__title}>
          {boardOwner && (
            <div className={styles.shared__owner}>Board owner is {boardOwnerLogin}</div>
          )}

          <Divider />

          <div className={styles.shared__subtitle}>Shared with:</div>
        </div>

        {shared.map((user, idx) => (
          <div key={idx} className={styles.shared__user_entry}>
            <div>{user}</div>
            <IconButton size="small" color="error" onClick={() => removeUser(user)}>
              <PersonOffIcon />
            </IconButton>
          </div>
        ))}

        <div className={styles.shared__user_add}>
          <TextField
            size="small"
            label="Add User"
            value={input}
            onChange={(e) => handleChange(e)}
            fullWidth
          />

          <IconButton color="success" onClick={addUser}>
            <PersonAddIcon />
          </IconButton>
        </div>
      </div>

      <Button variant="contained" size="small" onClick={handleSubmit}>
        submit
      </Button>
    </>
  );
}
export { Shared };
