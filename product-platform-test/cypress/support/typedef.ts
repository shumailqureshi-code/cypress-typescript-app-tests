import { UserData } from '../test_data/users/platformUsers/sync';
import { SDMUserData } from '../test_data/users/admUsers';

export {};
declare global {
  type Env = 'dev' | 'qa' | 'prod';

  type UserScenarios = 'teacher' | 'student';

  type UserRole = 'teacher' | 'student';

  type EnvVariables = {
    TEST_ENV: Env;
    AUTH: 'SDM' | undefined;
    USERS: Record<UserScenarios, SDMUserData | UserData>;
    R4R_TEACHER_HUB_URL: string;
    R4R_STUDENT_HUB_URL: string;
  };
  namespace Cypress {
    interface Cypress {
      env<T extends keyof EnvVariables>(envVar: T): EnvVariables[T];
    }
  }
}
