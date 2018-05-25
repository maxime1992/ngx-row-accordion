describe('Ngx row accordion', () => {
  beforeEach(() => {
    cy.visit('localhost:5200');
  });

  it('should not have any accordion visible at the beginning', () => {
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
  });

  it('should display the first panel only after clicking on open first', () => {
    cy.openFirstAccordion();

    cy.get('app-page-one').should('exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
  });

  it('should be able to toggle the display of the body', () => {
    cy.openFirstAccordion();

    cy
      .get('app-page-one')
      .should('exist')
      .contains('.body a', 'Open page 2');

    cy.get('app-page-one .title').click();

    cy
      .get('app-page-one')
      .contains('Page one content')
      .should('not.exist');

    cy
      .get('app-page-one .title')
      .contains('Page 1 title')
      .click();

    cy.get('app-page-one .body').contains('Page 1 content');
  });

  it('should fold previous accordion when opening a new one', () => {
    cy.openFirstAccordion();

    cy
      .get('app-page-one .body a')
      .as('linkToOpenPage2')
      .click();

    cy.get('app-page-one .title').contains('Page 1 title');

    cy
      .get('app-page-one .body')
      .contains('Page 1 content')
      .should('not.exist');
  });
});
