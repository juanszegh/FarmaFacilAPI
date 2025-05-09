# Farma Fácil
### A farmácia ideal a poucos cliques de você.
### Desenvolvida por: Juan Arce Anastácio, Juan Tavares Szegh Ferreira e Lucas Honorato Ferreira
#### ETEC Aristóteles Ferreira. 3º Ano do Ensino Médio Integrado a Habilitação de Técnico em Desenvolvimento de Sistemas

Swagger: https://app.swaggerhub.com/apis/etecaf/farma-facil/1.0.0  
Postman: https://app.getpostman.com/join-team?invite_code=04471de5ada26da14a9d162a68d1472791462ee37d8028f0e7fef9c235277584&target_code=cd4478c30148d9fec73ba64d01dd406b  
Video: https://youtu.be/JJw-FKPhIgM  

### Oque é a Farma Facil?
A Farma fácil é uma API pensada com o propósito de auxiliar na busca de produtos farmacêuticos, pois segundo o PROCON, remédios podem ser encontrados com uma diferença no seu valor de até 300% dependendo da farmácia.

### Nossa solução para isso
Com esse problema encontrado resolvemos utilizar uma tecnologia chamada “Web Scraping” que consiste em buscar dados de uma página da Web através de um seletor HTML. A escolha pelo "Web Scraping" é justificada pela necessidade de dados reais que atualizem de acordo com os valores disponíveis no website da farmácia. Portanto, se guardássemos os produtos no banco de dados, a nossa API deixaria de funcionar de maneira dinâmica, e exigiria novas inserções e atualizações para cada mudança no site. Ou seja, utilizar da tecnologia de raspagem da web, faz com que consigamos lidar com dados que sempre estarão condizentes com o valor atualizado da farmácia. Desta forma, podemos buscar pelo produto desejado pelo usuário e achar seu valor em diferentes farmácias que podem ser filtradas a partir da escolha dele, elas são: 
- Consultar uma farmácia específica;
- Consultar mais de uma farmácia específica;
- Todas as farmácias inseridas no banco de dados.

Sem contar a filtragem de menor ou maior valor, ou seja, dados reais em tempo real, tudo em lugar só, facilitando assim a escolha do usuário.

### Como utilizar a API Farma Fácil 

Obs: Antes de inicializar o programa, 
é necessário executar o comando: 
```console
@puppeteer/browsers install chrome
```
Para que o Web Scraping consiga utilizar do navegador chrome para fazer a busca. 
Em seguida, basta rodar com o comando:
```console
node .
```
Também tome cuidado na hora de colocar o valor da chave "ordem" para buscar, pois isso afetará o funcionamento.

## 📦 Buscar Produtos (GET)

| **Parametro**   | **Descrição**                                                      |
|-------------|---------------------------------------------------------------------|
| `ordem`     | Ordenação dos produtos (`menor_preco` ou `maior_preco`)            |
| `farmacia`  | Nome da farmácia a ser pesquisada                                  |
| `nome`      | Nome do produto desejado                                           |
| `limite`    | Número máximo de produtos retornados                               |

---

## 🏪 Carregar Farmácias (GET)

| **Parametro**       | **Descrição**                                  |
|------------------|------------------------------------------------|
| `cd_farmacia`    | Códigos das farmácias que devem ser carregadas |


## ➕ Criar Farmácia (POST)

| **Parametro**               | **Descrição**                             |
|--------------------------|--------------------------------------------|
| `nm_farmacia`            | Nome da farmácia                           |
| `seletor_preco`          | Seletor para acessar o preço               |
| `seletor_nome_produto`   | Seletor para acessar o nome do produto     |
| `seletor_link`   | Seletor para acessar o link do produto    |

Também é necessário 

| **Body** | **Descrição**                  |
|----------|--------------------------------|
| `url`    | URL da rota de pesquisa da farmácia                |
| `url_puro`    | URL base da farmácia                |

e

| **Header** | **Descrição**                                       |
|------------|-----------------------------------------------------|
| `auth`     | Token de autenticação para execução da rota         |








## ✏️ Editar Farmácia (POST)

| **Parametro**               | **Descrição**                             |
|--------------------------|--------------------------------------------|
| `cd_farmacia`            | Código da farmácia                         |
| `nm_farmacia`            | Nome da farmácia                           |
| `seletor_preco`          | Seletor para acessar o preço               |
| `seletor_nome_produto`   | Seletor para acessar o nome do produto     |
| `seletor_link`   | Seletor para acessar o link do produto    |


Tambem é necessário 

| **Body** | **Descrição**                  |
|----------|--------------------------------|
| `url`    | URL da rota de pesquisa da farmácia                |
| `url_puro`    | URL base da farmácia                |

e

| **Header** | **Descrição**                                       |
|------------|-----------------------------------------------------|
| `auth`     | Token de autenticação para execução da rota         |


## 🗑️ Excluir Farmácia (POST)

| **Parametro**       | **Descrição**                                |
|------------------|---------------------------------------------|
| `cd_farmacia`    | Código da farmácia que será excluída         |


Também é necessário 

| **Header** | **Descrição**                                       |
|------------|-----------------------------------------------------|
| `auth`     | Token de autenticação para execução da rota         |


## 🔐 Logar Admin (POST)

| **Parametro** | **Descrição**                                 |
|-----------|-----------------------------------------------|
| `login`   | Login para autenticação do administrador       |
| `senha`   | Senha para autenticação do administrador       |
