import { makeAutoObservable } from "mobx";

type User = {
  nickname: string;
  email: string;
  socialType: string;
  profileImg: string;
  currentExperience: number;
  totalExperience: number;
  id: number;
  level: number;
};

class UserStore {
  user: User | null = null;

  private static instance: UserStore | null = null;

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User | null {
    return this.user;
  }
}

const userStore = UserStore.getInstance();
export default userStore;
