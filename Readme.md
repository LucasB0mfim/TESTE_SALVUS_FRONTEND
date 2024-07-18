#### link para o site: https://teste-salvus-eplaygames.vercel.app/

# TesteSalvus Project

### Como Executar o Projeto Frontend

1. Baixe a pasta TesteSalvusFrontend na sua máquina.
2. Certifique-se de ter o Node.js instalado.
3. Abra sua IDE preferida ou o PowerShell (para usuários do Windows).
4. Navegue até a pasta do projeto e execute:
`npm i`

> Isso baixará todas as dependências necessárias.

Após a instalação, abra novamente o terminal e execute:
`npm run start`

*Aguarde aproximadamente 1 minuto para que a API seja iniciada e o site funcione normalmente.*

# Como Executar o Servidor

1. Baixe a pasta TesteSalvusAPI na sua máquina.
2. Certifique-se de ter o Node.js instalado.
3. Abra sua IDE preferida ou o PowerShell (para usuários do Windows).
4. Navegue até a pasta do projeto e execute:
`npm i`
5. Após a instalação, abra novamente o terminal e execute:
`npm start`

### Com o servidor rodando localmente, abra seu navegador favorito e cole esse link para ver todos os produtos:
1. http://localhost:3001/api/products

### Para acessar um produto específico:
1. http://localhost:3001/api/product/ID_DO_PRODUTO

### Para acessar os produtos por categoria:
1. http://localhost:3001/api/products/rpg
2. http://localhost:3001/api/products/simulacao
3. http://localhost:3001/api/products/acao
4. http://localhost:3001/api/products/esportes
5. http://localhost:3001/api/products/luta

# Como Adicionar, Deletar e Atualizar a API

Você pode usar o Postman ou o Insomnia para testar as funções da API. Ambos são ferramentas populares e fáceis de usar para testar APIs RESTful.

[**POSTMAN**:](https://www.postman.com/)

Download e Instalação: Baixe a versão adequada para o seu sistema operacional no site do Postman.

### Criar uma Nova Requisição:

1. Abra o Postman e clique em "New" para criar uma nova requisição.

2. Selecione o método HTTP apropriado (GET, POST, PUT, DELETE).
Digite a URL da API: http://localhost:3001/api/product.

3. Se for uma requisição POST ou PUT, vá até a aba "Body" e selecione "raw" e "JSON" para inserir o corpo da requisição.
Enviar Requisição: Clique em "Send" para enviar a requisição e ver a resposta.

### Exemplos de Requisições

**Criar um Produto (POST)**


URL: http://localhost:3001/api/product

Corpo da Requisição (JSON):

{
    "name": "FIFA 24",
    "description": "Descrição do FIFA 24",
    "release_date": "2024-09-30",
    "discount": 10,
    "old": 299.99,
    "current": 269.99,
    "category": "esportes",
    "system": "PS5",
    "developer": "Electronic Arts",
    "publisher": "EA Sports",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "cover": "https://example.com/cover.jpg",
    "details": {
        "languages": ["Inglês", "Português"]
    },
    "media": {
        "gallery": [
            {
                "type": "image",
                "url": "https://example.com/gallery1.jpg"
            },
            {
                "type": "video",
                "url": "https://example.com/video.mp4"
            }
        ]
    }
}

**Atualizar um Produto (PUT)**

URL: http://localhost:3001/api/product/1

Corpo da Requisição (JSON):

{
    "name": "nome_novo"
}

**Deletar um Produto (DELETE)**

URL: http://localhost:3001/api/product/1

# Links para os repositórios originais

Esse repositório foi criado apenas para o processo seletivo. Tanto a minha api quanto o meu site estão em repositórios diferentes! 

Caso você queira ver os commits, segue o link para cada um separadamente.

Site: https://github.com/LucasB0mfim/EplayGames

Api: https://github.com/LucasB0mfim/apiSalvus