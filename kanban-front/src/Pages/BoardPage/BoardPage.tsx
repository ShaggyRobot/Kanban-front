import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateColumn } from '../../Components/Forms/CreateColumn/CreateColumn';
import { useGetBoardQuery } from '../../RTK/API/boardsApi';
import { Column } from './Column/Column';

function BoardPage(): JSX.Element {
  const { id } = useParams();
  const { data } = useGetBoardQuery(id!);

  return (
    <div className="page">
      <h1>{data?.title}</h1>
      <h2>{data?.description}</h2>
      {data &&
        data.columns.map((column) => {
          return <Column boardId={id!} columnId={column.id} key={column.id} />;
        })}
      <CreateColumn boardId={id!} />
    </div>
  );
}
export { BoardPage };
