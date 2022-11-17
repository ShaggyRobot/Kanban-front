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
  id: string;
  title: string;
  order: number;
  description: string;
  iserId: string;
  files: Array<IFile>;
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
  ISignInResponse,
  ISignUpBody,
  ISignUpResponse,
  ICreateBoardBody,
  IBoardFaceDTO,
  IFile,
  ITask,
  IColumn,
  IBoardDTO,
};
