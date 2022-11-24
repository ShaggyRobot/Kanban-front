interface ISignUpBody {
  name: string;
  login: string;
  password: string;
}

interface ISignInBody {
  login: string;
  password: string;
}

interface ISignUpResponse {
  id: string;
  name: string;
  login: string;
}

interface ISignInResponse {
  token: string;
}

interface ICreateBoardBody {
  title: string;
  description: string;
}

interface ICreateTaskBody extends ICreateBoardBody {
  userId: string;
}

interface IBoardFaceDTO {
  id: string;
  title: string;
  description: string;
}

interface IFile {
  filename: string;
  fileSize: number;
}

interface ITask {
  title: string;
  order: number;
  description: string;
  userId: string;
  id: string;
  files: Array<IFile>;
}

interface ITaskUpdate {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: Array<ITask>;
}

interface IBoardDTO extends IBoardFaceDTO {
  id: string;
  title: string;
  description: string;
  columns: Array<IColumn>;
}

export type {
  ISignInBody,
  ISignUpBody,
  ISignInResponse,
  ISignUpResponse,
  ICreateBoardBody,
  IBoardFaceDTO,
  IFile,
  ITask,
  ITaskUpdate,
  IColumn,
  IBoardDTO,
  ICreateTaskBody,
};
