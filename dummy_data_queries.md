# Scripts de Inserção de Dados Fictícios

Para inserir os dados no banco de dados SQLite, você pode rodar as seguintes queries SQL no seu gerenciador de banco de dados (como o DBeaver, DBeaver Universal, DB Browser for SQLite, etc). 

> **Atenção:** Como você está usando o Sequelize, as tabelas geralmente são criadas com os nomes no plural (`Books` e `Clients`) e possuem obrigatoriamente as colunas de data de criação e modificação (`createdAt` e `updatedAt`). As queries abaixo assumem esse comportamento padrão do Sequelize.

## Inserção na Tabela de Clientes (`Clients`)

```sql
INSERT INTO Clients (name, email, phone, cpf, address, createdAt, updatedAt) VALUES
('João Silva', 'joao.silva@email.com', '(11) 98765-4321', '123.456.789-00', 'Rua das Flores, 123, São Paulo - SP', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Maria Oliveira', 'maria.oliveira@email.com', '(21) 91234-5678', '098.765.432-11', 'Av. Atlântica, 456, Rio de Janeiro - RJ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Carlos Souza', 'carlos.souza@email.com', '(31) 99876-5432', '111.222.333-44', 'Rua da Paz, 789, Belo Horizonte - MG', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ana Clara', 'ana.clara@email.com', '(41) 98888-7777', '555.666.777-88', 'Av. das Araucárias, 321, Curitiba - PR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pedro Santos', 'pedro.santos@email.com', '(51) 97777-6666', '999.888.777-66', 'Rua dos Andradas, 654, Porto Alegre - RS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

## Inserção na Tabela de Livros (`Books`)

```sql
INSERT INTO Books (title, author, year, category, description, status, createdAt, updatedAt) VALUES
('O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', '1954', 'Fantasia', 'O início da clássica jornada de Frodo para destruir o Um Anel.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('1984', 'George Orwell', '1949', 'Ficção Científica / Distopia', 'Uma distopia sobre um regime totalitário e a vigilância constante do Grande Irmão.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dom Casmurro', 'Machado de Assis', '1899', 'Romance / Literatura Brasileira', 'A clássica história de relutância, ciúme e a dúvida sobre a traição de Capitu.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', '1943', 'Infantil / Filosofia', 'A poética e filosófica jornada de um jovem príncipe proveniente de um pequeno asteroide.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sapiens: Uma Breve História da Humanidade', 'Yuval Noah Harari', '2011', 'História / Ciência', 'Uma exploração abrangente da história e evolução da espécie humana.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('O Código Da Vinci', 'Dan Brown', '2003', 'Suspense / Mistério', 'Uma investigação empolgante envolvendo sociedades secretas e importantes obras de arte.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A Revolução dos Bichos', 'George Orwell', '1945', 'Sátira Política / Ficção Clássica', 'Uma alegoria rica sobre a Revolução e o poder contada através dos animais de uma fazenda.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A Culpa é das Estrelas', 'John Green', '2012', 'Romance / Drama Jovem Adulto', 'Dois adolescentes que se conhecem em um grupo de apoio a pacientes com câncer embarcam juntos numa jornada.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('O Alquimista', 'Paulo Coelho', '1988', 'Ficção / Esoterismo', 'A história mística do pastor Santiago e sua busca por um tesouro nas pirâmides do Egito.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('A Metamorfose', 'Franz Kafka', '1915', 'Ficção Fantástica / Clássico', 'A perturbadora história de Gregor Samsa, que acorda um dia transformado em um inseto monstruoso.', 'disponível', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```
