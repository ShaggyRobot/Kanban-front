import React from 'react';
import { useGetColumnQuery } from '../../../RTK/API/columnsApi';

function Column(props: { boardId: string; columnId: string }): JSX.Element {
  const { boardId, columnId } = props;
  const { data } = useGetColumnQuery([boardId, columnId]);
  return (
    <div>
      {data?.title}
      {data?.order}
    </div>
  );
}
export { Column };
