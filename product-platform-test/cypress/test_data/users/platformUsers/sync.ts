export interface UserData {
  username: string;
  password: string;
  district: string;
  role: UserRole;
}

const platformUsers: Record<Env, Record<UserScenarios, UserData>> = {
  dev: {
    teacher: {
      username: '',
      password: '',
      district: '',
      role: 'teacher',
    },
    student: {
      username: '',
      password: '',
      district: '',
      role: 'student',
    },
  },
  qa: {
    teacher: {
      username: '',
      password: '',
      district: '',
      role: 'teacher',
    },
    student: {
      username: '',
      password: '',
      district: '',
      role: 'student',
    },
  },
  prod: {
    teacher: {
      username: '',
      password: '',
      district: '',
      role: 'teacher',
    },
    student: {
      username: '',
      password: '',
      district: '',
      role: 'student',
    },
  },
};

export default platformUsers;
