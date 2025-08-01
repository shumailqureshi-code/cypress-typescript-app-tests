import StudentHubHomePage from '../../pages/ABCApp/StudentHomePage';
import TeacherHubHomePage from '../../pages/ABCApp/TeacherHomePage';

describe('Educator And Student Login', { tags: '@EducatorStudentLogin' }, function () {
  it('Educator Login', { tags: '@Teacher' }, function () {
    cy.initiateUserSession(Cypress.env('USERS').teacher);
    cy.launchApp(Cypress.env('USERS').teacher);
    TeacherHubHomePage.visit();
    TeacherHubHomePage.verifyUserIsNavigatedToR4R();
  });

  it('Student Login', { tags: '@Student' }, function () {
    cy.initiateUserSession(Cypress.env('USERS').student);
    cy.launchApp(Cypress.env('USERS').student);
    StudentHubHomePage.visit();
    StudentHubHomePage.verifyUserIsNavigatedToR4R();
  });
});
