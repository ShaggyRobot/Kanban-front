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

export { ISignInBody, ISignInResponse, ISignUpBody, ISignUpResponse };
