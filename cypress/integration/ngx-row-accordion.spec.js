describe('Ngx row accordion', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not have any accordion visible at the beginning', () => {
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.location().should(loc => expect(loc.pathname).to.equal('/'));
  });

  it('should display the first panel only after clicking on open first', () => {
    cy.openFirstAccordionPrimary();

    cy.get('app-page-one').should('exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1'));
  });

  it('should be able to toggle the display of the body', () => {
    cy.openFirstAccordionPrimary();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1'));

    cy.get('app-page-one')
      .should('exist')
      .contains('.body a', 'Open page 2');

    cy.get('app-page-one .title').click();

    cy.get('app-page-one')
      .contains('Page one content')
      .should('not.exist');

    cy.get('app-page-one .title')
      .contains('Page 1 title')
      .click();

    cy.get('app-page-one .body').contains('Page 1 content');
  });

  it('should fold previous accordion when opening a new one', () => {
    cy.openFirstAccordionPrimary();

    cy.get('app-page-one .body a')
      .as('linkToOpenPage2')
      .click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1/page2'));

    cy.get('app-page-one .title').contains('Page 1 title');

    cy.get('app-page-one .body')
      .contains('Page 1 content')
      .should('not.exist');
  });

  it('should unfold previous accordion when closing one', () => {
    cy.openFirstAccordionPrimary();
    cy.contains('Open page 2').click();
    cy.contains('Open page 3').click();

    // going to the page with `cy.visit('/app/accordions/page1/page2/page3')` would have been easier but ends up
    // in production build (only) with the following error
    // `Blocked a frame with origin "http://localhost:5200" from accessing a cross-origin frame`

    cy.contains('app-page-one .body', 'Page 1 content').should('not.exist');
    cy.contains('app-page-two .body', 'Page 2 content').should('not.exist');
    cy.contains('app-page-three .body', 'Page 3 content').should('exist');

    cy.contains('Come back to page 2').click();

    cy.contains('app-page-one .body', 'Page 1 content').should('not.exist');
    cy.contains('app-page-two .body', 'Page 2 content').should('exist');
    cy.contains('app-page-three .body', 'Page 3 content').should('not.exist');

    cy.contains('Come back to page 1').click();

    cy.contains('app-page-one .body', 'Page 1 content').should('exist');
    cy.contains('app-page-two .body', 'Page 2 content').should('not.exist');
    cy.contains('app-page-three .body', 'Page 3 content').should('not.exist');
  });

  it('should be able to fold the first accordion after opening page 2, re-opening page 1, opening page 3', () => {
    cy.openFirstAccordionPrimary();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1'));

    cy.get('app-page-one .body a')
      .contains('Open page 2')
      .click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1/page2'));

    cy.get('app-page-one .title')
      .contains('Page 1 title')
      .click();
    cy.get('app-page-one .body').contains('Page 1 content');

    cy.get('app-page-two .body a')
      .contains('Open page 3')
      .click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1/page2/page3'));

    cy.get('app-page-two .body')
      .contains('Page 2 content')
      .should('not.exist');

    cy.get('app-page-one .title')
      .contains('Page 1 title')
      .click();
    cy.get('app-page-one .body')
      .contains('Page 1 content')
      .should('not.exist');
  });

  it('should keep page 1 opened after going to page 2, opening page 1 again, opening page 3', () => {
    cy.openFirstAccordionPrimary();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1'));

    cy.get('app-page-one .body a')
      .contains('Open page 2')
      .click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1/page2'));

    cy.get('app-page-one .title')
      .contains('Page 1 title')
      .click();

    cy.get('app-page-two .body a')
      .contains('Open page 3')
      .click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1/page2/page3'));

    cy.get('app-page-one .body').contains('Page 1 content');
  });

  it('should close all the panels', () => {
    cy.openFirstAccordionPrimary();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions/page1'));

    cy.get('[data-close-all-primary]').click();

    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions'));

    cy.get('app-accordions-page > .accordions-container')
      .children()
      .should('have.length', 1);
  });

  it('should open page 4 into a separated URL', () => {
    cy.openFirstAccordionAux();

    cy.location().should(loc => expect(loc.pathname).to.equal('/(aux:auxiliary-route/accordions/page4)'));

    cy.get('app-page-four');
  });

  it('should not mixup different groups', () => {
    // open page 4 (aux)
    cy.openFirstAccordionAux();
    cy.location().should(loc => expect(loc.pathname).to.equal('/(aux:auxiliary-route/accordions/page4)'));
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four');
    cy.get('app-page-five').should('not.exist');
    cy.get('app-page-six').should('not.exist');

    // open page 5 (aux)
    cy.contains('Open page 5').click();
    cy.location().should(loc => expect(loc.pathname).to.equal('/(aux:auxiliary-route/accordions/page4/page5)'));
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four');
    cy.get('app-page-five');
    cy.get('app-page-six').should('not.exist');

    // open page 1 (primary)
    cy.openFirstAccordionPrimary();
    cy.location().should(loc =>
      expect(loc.pathname).to.equal('/app/accordions/page1(aux:auxiliary-route/accordions/page4/page5)')
    );
    cy.get('app-page-one');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four');
    cy.get('app-page-five');
    cy.get('app-page-six').should('not.exist');

    // open page 2 (primary)
    cy.contains('Open page 2').click();
    cy.location().should(loc =>
      expect(loc.pathname).to.equal('/app/accordions/page1/page2(aux:auxiliary-route/accordions/page4/page5)')
    );
    cy.get('app-page-one');
    cy.get('app-page-two');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four');
    cy.get('app-page-five');
    cy.get('app-page-six').should('not.exist');

    // close all primary
    cy.get('[data-close-all-primary]').click();
    cy.location().should(loc =>
      expect(loc.pathname).to.equal('/app/accordions(aux:auxiliary-route/accordions/page4/page5)')
    );
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four');
    cy.get('app-page-five');
    cy.get('app-page-six').should('not.exist');

    // close all auxiliary
    cy.get('[data-close-all-aux]').click();
    cy.location().should(loc => expect(loc.pathname).to.equal('/app/accordions'));
    cy.get('app-page-one').should('not.exist');
    cy.get('app-page-two').should('not.exist');
    cy.get('app-page-three').should('not.exist');
    cy.get('app-page-four').should('not.exist');
    cy.get('app-page-five').should('not.exist');
    cy.get('app-page-six').should('not.exist');
  });
});
