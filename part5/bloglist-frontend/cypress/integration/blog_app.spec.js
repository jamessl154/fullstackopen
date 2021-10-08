// https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl
// https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State
describe('On visit to the blog app,', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('the login form is shown', function() {
    cy.get('[data-cy=login]').contains('Login')
  })
})