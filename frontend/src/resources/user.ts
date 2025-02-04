
export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  userBio?: string;
  userImage?: string;
  userCoverImage?: string;
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

export type Credentials = {
  email?: string;
  password?: string;
}

export type AccessToken = {
  accessToken?: string;
}

export type UserSessionToken = {
  id?: number;
  username?: string;
  userImage?: string;
  email?: string;
  accessToken?: string;
  expiration?: number;
}


