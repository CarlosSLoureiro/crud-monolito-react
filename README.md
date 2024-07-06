# CRUD monólito com React

## 👨🏻‍💻 Motivação
Aplicações construídas de forma monolítica estão com estereótipo de aplicações ruins por parte da comunidade. E de fato, em um cenário onde a agilidade e a escalabilidade são frequentemente destacadas, os monólitos muitas vezes são vistos como uma relíquia do passado. No entanto, gostaria de propor uma reflexão sobre a importância dos monólitos, especialmente quando lidamos com equipes de desenvolvedores enxutas (que acredito ser a realidade de muitas iniciativas).

Em projetos pequenos, onde a equipe de desenvolvedores é limitada, os monólitos podem ser um aliado poderoso. Eles oferecem uma abordagem simples e direta para a construção de aplicações, permitindo que equipes pequenas se concentrem na entrega de valor sem sobrecarga de complexidade arquitetural.

Aqui estão algumas razões pelas quais os monólitos merecem nossa atenção e consideração:

1. **Simplicidade:** Com apenas uma base de código para gerenciar, os monólitos simplificam o desenvolvimento, teste e implantação. Isso reduz a sobrecarga de comunicação e coordenação em equipes pequenas.

2. **Facilidade de entendimento:** Em uma equipe pequena, onde todos precisam entender todas as partes do sistema, um monólito oferece uma visão completa e coesa do aplicativo, facilitando a colaboração e o desenvolvimento conjunto.

3. **Custos reduzidos:** A manutenção de um monólito geralmente é mais barata do que a de uma arquitetura distribuída, especialmente quando consideramos equipes pequenas com recursos limitados.

4. **Rápida iteração:** Com todas as partes do sistema em um único código-base, as mudanças podem ser implementadas e testadas rapidamente, acelerando o ciclo de desenvolvimento.

5. **Foco na entrega de valor:** Ao invés de se preocupar com a complexidade da arquitetura, equipes pequenas podem se concentrar no que realmente importa: entregar um produto de qualidade que funcione e atenda às necessidades dos clientes.

É importante ressaltar que os monólitos não são a solução ideal para todos os cenários. Projetos maiores ou que exigem escalabilidade extrema podem se beneficiar de arquiteturas mais distribuídas. No entanto, em projetos pequenos, onde os recursos são limitados e a simplicidade e agilidade são essenciais, os monólitos podem ser uma escolha sábia. Portanto, antes de descartar os monólitos como obsoletos, convido você a considerar seu valor em projetos pequenos. Eles podem ser a chave para o sucesso de sua equipe e de seu projeto.

Portanto, com base nesse pensamento, desenvolvi essa aplicação em [React](https://react.dev) com [NextJS](https://nextjs.org) para que qualquer pessoa possa usá-la como base de seus projetos.

### Qual a diferença?
Se você já utilizou [Laravel](https://laravel.com), [Zend](https://framework.zend.com) ou algum outro framework em [PHP](https://www.php.net) para construir aplicações monolíticas, você já deve ter tido dores de cabeça para construir lógicas no front-end.

Geralmente, construir front-end em aplicações monolíticas é sinônimo de dor de cabeça. Até poderíamos usar [React](https://react.dev), [Vue](https://vuejs.org) ou algum outro framework para contornar isso, porém o projeto acaba ficando com cara de *Frankenstein* 🧟‍♂️ mesmo usando frameworks também em *JavaScript* como o [AdonisJS](https://adonisjs.com).

O diferencial deste projeto é que, além do código inteiro do projeto ser apenas em [TypeScript](https://www.typescriptlang.org), estamos criando rotas dinâmicas para segregar o que é back-end e front-end na aplicação. Além de todos os outros recursos que o [React](https://react.dev) e [NextJS](https://nextjs.org) nos oferece. Além disso, estamos fazendo uma forte tipagem para garantir as assinaturas das requisições a fim de evitar inconsistências entre o back-end e o front-end.

Também criei uma lógica para lidar com as rotas dinâmicas, tentei deixar de uma forma bem prática e fácil de usar, inspirado no [ExpressJS](https://expressjs.com) para tratar as requisições.

## 🎥 Prévia
https://github.com/CarlosSLoureiro/crud-monolito-react/assets/19580424/459bec57-38df-47fb-8d09-82b58682051b

## ✅ Características Técnicas

- [x] Feito em [TypeScript](https://www.typescriptlang.org) com [React](https://react.dev) e [NextJS](https://nextjs.org)
- [x] Modelagem do banco de dados [TypeORM](https://typeorm.io)
- [x] Validação de requisições com [Zod](https://zod.dev)
- [x] Testes unitários com [Jest](https://jestjs.io)
- [x] Fluxo de teste com [GitHub Actions](https://docs.github.com/pt/actions)
- [x] Autenticação com [JSON Web Token](https://jwt.io)
- [x] Lógica de autenticação com *Access* e *Refresh tokens*
- [x] Captura de erros com [Sentry](https://sentry.io) (o front-end com gravação de tela)
- [x] Front-end feito com [Material UI](https://mui.com/material-ui/)
- [x] Telas responsivas (compatível com Desktop e Mobile)
- [x] Compatível com modo escuro (automático ou manual)

## 💻 Pré-requisitos
Para executar essa aplicação, você deve ter um servidor [MySQL](https://www.mysql.com) sendo executado e o [NodeJS v20](https://nodejs.org/pt) ou superior instalado em sua máquina.

## 🚀 Executando

Após clonar o projeto, siga estas etapas:

1. Caso você tenha o [Docker](https://www.docker.com) instalado em sua máquina, basta executar o comando `docker-compose up -d`. Dessa forma, um servidor [MySQL](https://www.mysql.com) + [phpMyAdmin](https://www.phpmyadmin.net) será executado em sua máquina. (Acessível em http://localhost:8080)

2. Faça uma cópia do arquivo `.env.example` para `.env` e configure com as credenciais do seu servidor MySQL.

3. Instale as dependências do projeto com o comando `npm install`.

4. Execute os scripts configurados no projeto com *npm* para gerenciar a aplicação.
    - `npm test` - Executará os testes unitários
    - `npm run dev` - Executará o projeto em modo de desenvolvimento
    - `npm run build` - Gerará a build do projeto para produção
    - `npm start` - Executará a build de produção, caso tenha sido gerada

## ℹ️ Informações Adicionais
- O projeto foi construído com 2 ambientes de testes unitários (pode ser observado no arquivo `jest.config.ts`): 
    - **server:** executará os testes que estão no diretório `src/server/` pelo ambiente *node*
    - **client:** executará os testes que estão no diretório `src/client/` pelo ambiente *jsdom*

    ![Teste](https://github.com/CarlosSLoureiro/crud-monolito-react/assets/19580424/45bf4311-70f9-49f1-8915-766171f047e6)

- Embora esteja configurado, por se tratar de um código compilado, ver stack de erros no código de produção pode ser uma tarefa um pouco desafiadora. Ademais, erros não tratados no client contêm o replay do usuário (o que poderá ajudar a reproduzir o problema).
  - Veja:
    ![Error](https://github.com/CarlosSLoureiro/crud-monolito-react/assets/19580424/479e4b71-a281-4c91-a4f6-c1a0d8ebb445)

https://github.com/CarlosSLoureiro/crud-monolito-react/assets/19580424/b8cf142b-ea21-45af-858f-fce50502f267

- O client já possui um **hook** para lidar com as requisições, inclusive com uma lógica de refresh token já configurada mesmo em requisições simultâneas (`Promise.all`).
    ![Refresh Token](https://github.com/CarlosSLoureiro/crud-monolito-react/assets/19580424/9d99eb7d-ef45-4d7d-8e4a-ab25be32eba6)

- Recomendo fortemente instalar as extensões recomendadas definidas no projeto para o [VSCode](https://code.visualstudio.com) a fim de tornar o seu desenvolvimento mais otimizado.

## ✔️ Conclusão

Como mencionei anteriormente, esse projeto visa ajudar pequenas equipes de desenvolvedores que optarem pelo uso de um monólito simples e bem estruturado. Espero que seja útil para alguém de alguma forma. E, caso queira contribuir, doar ou dar algum feedback, por favor, estou à disposição em meu **LinkedIn**: https://www.linkedin.com/in/carlos-s-loureiro/ 😉
