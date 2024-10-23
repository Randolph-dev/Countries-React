describe("Countries login tests", () => {
    it('Login page is visible', () => {
        cy.visit('http://localhost:5173/login')
        cy.get('input[type=email]').type("test@test.com");
        cy.get('input[type=password]').type("password");
        cy.get('Button').contains("Login").click();
    });
});