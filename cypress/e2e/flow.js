describe('Happy flow', () => {
  it('Shows the high care page in case of more than 4 activities selected.', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#activity-1').click();
    cy.get('#activity-2').click();
    cy.get('#activity-3').click();
    cy.get('#activity-4').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('1001');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/highcare');
  });
  it('Shows the high care page in case of an e-commerce activity and sum insured is more than 2000000.', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#activity-1').click();
    cy.get('#activity-2').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('2000001');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/highcare');
  });
  it('Shows the high care page in case of both IT and e-commerce activities and sum insured is more than 500001.', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#activity-4').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('500001');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/highcare');
  });

  it('Shows the high care page in case of an IT activity and sum insured is more than 500000.', () => {
    cy.visit('/');
    cy.get('#activity-4').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('500001');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/highcare');
  });
  it('Shows the checkout page in case of 4 activities selected and sum is in bounds.', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#activity-1').click();
    cy.get('#activity-2').click();
    cy.get('#activity-3').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('1000');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/checkout');
  });
  it('Shows the checkout page in case of an e-commerce activity and sum insured is 2000000.', () => {
    cy.visit('/');
    cy.get('#activity-1').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('2000000');
    cy.get('#inventory-next-page-btn').click();
    cy.url().should('eq', 'http://localhost:3000/checkout');
  });
});
describe('Unhappy flow', () => {
  it('shows an alert when no activity has been selected', () => {
    cy.visit('/');
    cy.get('#next-page-button').click();
    cy.get('.error-message').should(
      'have.text',
      'No activity can lead to health problems'
    );
  });
  it('shows an alert when the inventory value is above 10000000', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('10000001');
    cy.get('#inventory-next-page-btn').click();
    cy.get('.error-message').should(
      'have.text',
      'Whoah, calm down Scrooge McDuck'
    );
  });
  it('shows an alert when the inventory value is less than 1000', () => {
    cy.visit('/');
    cy.get('#activity-0').click();
    cy.get('#next-page-button').click();
    cy.get('#inventory').type('999');
    cy.get('#inventory-next-page-btn').click();
    cy.get('.error-message').should(
      'have.text',
      'You need to have more stuff to run your business, stupid'
    );
  });
});
