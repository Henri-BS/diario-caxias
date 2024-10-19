export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  userBio?: string;
  userImage?: string;
  userLocation?: string;
  createdDate?: string;
};

export type UserPage = {
  content: User[];
  page: {
    size?: number;
    totalElements: number;
    totalPages?: number;
    number: number;
  };
};

export type UserProps = {
  user: User;
};


export class Credentials {
    email?: string;
    password?: string;
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    id?: number;
    username?: string;
    image?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}

