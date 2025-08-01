export interface ADMUserData {
  username: string;
  password: string;
  role: UserRole;
  org: string;
}

const sdmUsers: Record<Env, Record<UserScenarios, SDMUserData>> = {
  dev: {
    teacher: {
      username: '',
      password: '',
      role: 'teacher',
      org: '',
    },
    student: {
      username: '',
      password: '',
      role: 'student',
      org: '',
    },
  },
  qa: {
    teacher: {
      username: '',
      password: '',
      role: 'teacher',
      org: '',
    },
    student: {
      username: '',
      password: '',
      role: 'student',
      org: '',
    },
  },
  prod: {
    teacher: {
      username: '',
      password: '',
      role: 'teacher',
      org: '',
    },
    student: {
      username: '',
      password: '',
      role: 'student',
      org: '',
    },
  },
};

export default sdmUsers;
