# Cadastro de Carro

**RF**

* Deve ser possível cadastrar um novo carro
* Deve ser possível listar todos os carros

**RN**

* Somente usuários administradores podem cadastrar
* Não deve ser possível cadastrar um carro com placa já existente
* Não deve ser possível alterar a placa de um carro que já foi locado
* O carro deve ser cadastradado como disponível por padrão

# Listagem de Carros

**RF**

* Deve ser possível listar os carros disponíveis
* Deve ser possível listar os carros pelo modelo
* Deve ser possível listar os carros pela marca
* Deve ser possível listar os carros pela categoria


**RN**

* Não precisa estar logado


# Cadastro de Especificações no carro

**RF**

* Deve ser possível listar todas as especificações
* Deve ser possível cadastrar uma especificação para um carro
* Deve ser possível listar todos os carros pela especificação

**RN**

* Somente usuários administradores podem cadastrar
* Não deve ser possível cadastrar uma especificação para um carro inexistente
* Não deve ser possível cadastrar uma especificação já existente para um mesmo carro


# Cadastro de Imagens no carro

**RF**

* Deve ser possível cadastrar imagens no carro
* Deve ser possível listar todos os carros

**RNF**

* Ultilizar o Multer

**RN**

* Somente usuários administradores podem cadastrar
* O usuário deve ser possível cadastrar mais de uma imagem por carro


# Aluguel de Carro

**RF**

* Deve ser possível cadastrar um aluguel

**RN**

* O Aluguel deve ter duração mínima de 24 hora
* Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo usuário
* Não deve ser possível cadastrar um novo aluguel caso exista um aberto para o mesmo carro

---


**RF**

* Lorem
* Lorem

**RNF**

* Lorem
* Lorem

**RN**

* Lorem
* Lorem