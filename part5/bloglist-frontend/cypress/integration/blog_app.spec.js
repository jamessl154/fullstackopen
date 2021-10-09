// https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl
// https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Logging-In-Controlling-State
describe('On visit to the blog app,', function() {

  beforeEach(function() {
    // reset the DB
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('the login form is shown', function() {
    cy.get('[data-cy=loginForm]').contains('Login')
  })

  // https://docs.cypress.io/guides/getting-started/testing-your-app#Fully-test-the-login-flow-but-only-once
  describe('When logging in,',function() {

    beforeEach(function() {
      // create user, bypass UI because we currently have no UI to register new users
      // test manual login flow once here
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'S1!lainen'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('S1!lainen')
      cy.get('[data-cy=loginButton]').click()
      cy.get('.notification').contains('mluukkai logged in successfully!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong password')
      cy.get('[data-cy=loginButton]').click()
      cy.get('.notification').contains('Wrong username or password.')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        // log in user
        cy.login({ username: 'mluukkai', password: 'S1!lainen' })
      })

      it('A blog can be created', function() {

        const blog = {
          title: 'cypressTestTitle',
          author: 'cypressTestAuthor',
          url: 'cypressTestUrl'
        }

        cy.createBlog(blog)
        cy.visit('http://localhost:3000')
        cy.get('.bloglist')
          .contains('cypressTestTitle')
          .contains('cypressTestAuthor')
      })
    })
  })
})

// https://docs.cypress.io/api/cypress-api/custom-commands#Syntax

Cypress.Commands.add('login', ({ username, password }) => {

  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedInBloglistUser', JSON.stringify(body))
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', (blog) => {

  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInBloglistUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})