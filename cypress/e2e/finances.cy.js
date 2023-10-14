
//executa o before each antes de cada teste
beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/#")
})

describe('Incluir Transações', () => {
    it('Cadastrar Uma Entrada', () => {
        criarTransacao("Freela", "250")

        cy.get("tbody tr td.description").should("have.text", "Freela") //validação
    });

    it('Cadastrar uma saída', () => {       
       criarTransacao("Cinema", "-40")
       cy.get("tbody tr td.description").should("have.text", "Cinema") //validação
    })

    it('Excluir transação', () => {
        criarTransacao("Freela", 100)
        criarTransacao("Salario", 4000)

       // cy.contains(".description", "Freela").parent().find('img').click() //encontrar elemento pai a partir do filho

       cy.contains(".description", "Freela").siblings().children('img').click()

        cy.get('tbody tr').should("have.length", 1)
                
    })
});

function criarTransacao(descricao, valor){
    cy.contains("Nova Transação").click() //encontrar elemento pelo texto
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15")
    cy.get('button').click() 
}