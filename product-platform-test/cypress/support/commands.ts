import EducatorSignInPage from '../pages/ADM/SignIn/EducatorSignInPage';
import EducatorPortalPage from '../pages/ADM/Portal/EducatorPortalPage';
import PlatformSignInPage from '../pages/Platform/PlatformSignInPage';
import { SDMUserData } from '../test_data/users/admUsers';
import { UserData } from '../test_data/users/platformUsers/sync';
import PlatformHomePage from '../pages/Platform/PlatformHomePage';
import StudentSignInPage from '../pages/ADM/SignIn/StudentSignInPage';
import StudentPortalPage from '../pages/ADM/Portal/StudentPortalPage';
declare global {
  namespace Cypress {
    interface Chainable {
      initiateUserSession(user: SDMUserData): Chainable<void>;
      initiateUserSession(user: UserData): Chainable<void>;
      initiateUserSession(user: SDMUserData | UserData): Chainable<void>;
      launchR4R(user: SDMUserData): Chainable<void>;
      launchR4R(user: UserData): Chainable<void>;
      launchR4R(user: SDMUserData | UserData): Chainable<void>;
    }
  }
}

function validateUserSession() {
  const userInfoEndpointPath = Cypress.env('AUTH') === 'SDM' ? '/user' : '/api/auth/v2/me';
  cy.request(userInfoEndpointPath).its('status').should('eq', 200);
}

Cypress.Commands.add('initiateUserSession', (user) => {
  cy.session(
    { ...user, source: Cypress.env('AUTH') === 'SDM' ? 'SDM' : 'Platform' },
    () => {
      if ('district' in user) {
        PlatformSignInPage.visit();
        PlatformSignInPage.ssLogIn(user);
      } else {
        if (user.role === 'teacher') {
          EducatorSignInPage.visit();
          EducatorSignInPage.myLogin(user);
          EducatorPortalPage.switchUserRoleToTeacher();
          EducatorPortalPage.verifyUserIsSignedIn();
        } else if (user.role === 'student') {
          StudentSignInPage.visit();
          StudentSignInPage.studentLogin(user);
          StudentPortalPage.verifyUserIsSignedIn();
        }
      }
    },
    { cacheAcrossSpecs: true, validate: validateUserSession },
  );
});

Cypress.Commands.add('launcApp', (user) => {
  if ('district' in user) {
    PlatformHomePage.visit();
    PlatformHomePage.clickR4RAppCard();
  } else {
    if (user.role === 'teacher') {
      EducatorPortalPage.visit();
      EducatorPortalPage.selectOrg(user.org);
      EducatorPortalPage.clickCardApp();
    } else if (user.role === 'student') {
      StudentPortalPage.visit();
      StudentPortalPage.clickCardApp();
    }
  }
});
