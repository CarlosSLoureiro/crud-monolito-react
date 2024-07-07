# CRUD monólito com React

## 👨🏻‍💻 Motivação
Aplicações monolíticas têm um estereótipo negativo na comunidade. E de fato, em um cenário onde a agilidade e a escalabilidade são frequentemente destacadas, os monólitos muitas vezes são vistos como uma relíquia do passado. No entanto, gostaria de abordar uma reflexão sobre a importância dos monólitos, especialmente quando lidamos com equipes de desenvolvedores enxutas (que acredito ser a realidade de muitas iniciativas).

Em projetos pequenos, os monólitos podem ser aliados poderosos. Eles oferecem uma abordagem simples e direta, permitindo que equipes pequenas se concentrem na entrega de valor sem complexidade arquitetural excessiva.

Aqui estão algumas razões para considerar os monólitos:

1. **Simplicidade:** Com uma base de código única, os monólitos simplificam o desenvolvimento, teste e implantação, reduzindo a necessidade de comunicação e coordenação.

2. **Facilidade de entendimento:** Em equipes pequenas, onde todos precisam entender o sistema como um todo, um monólito oferece uma visão coesa do aplicativo, facilitando a colaboração.

3. **Custos reduzidos:** A manutenção de um monólito é geralmente mais barata do que uma arquitetura distribuída, especialmente para equipes com recursos limitados.

4. **Rápida iteração:** Com todas as partes do sistema em um único código-base, mudanças podem ser implementadas e testadas rapidamente, acelerando o desenvolvimento.

5. **Foco na entrega de valor:**  Equipes pequenas podem se concentrar em entregar um produto de qualidade e que atenda às necessidades dos clientes, sem se preocupar com a complexidade arquitetural.

É claro que monólitos não são a solução ideal para todos os cenários. Projetos maiores ou que exigem alta escalabilidade podem se beneficiar de arquiteturas distribuídas. No entanto, em projetos pequenos, onde a simplicidade e agilidade são essenciais, os monólitos podem ser uma escolha sábia. Portanto, antes de descartá-los, considere seu valor para projetos pequenos.

Baseado nisso, desenvolvi essa aplicação em [React](https://react.dev) com [NextJS](https://nextjs.org) que pode ser usada como base para outros projetos.

### Qual a diferença?

Se você já usou frameworks [PHP](https://www.php.net) como [Laravel](https://laravel.com) ou [Zend](https://framework.zend.com), deve ter enfrentado desafios ao construir lógicas no front-end. Construir front-end em monólitos é muitas vezes sinônimo de dor de cabeça. Embora possamos usar frameworks como [React](https://react.dev) ou [Vue](https://vuejs.org), o projeto pode acabar parecendo um Frankenstein 🧟‍♂, mesmo com frameworks em JavaScript como [AdonisJS](https://adonisjs.com).

O diferencial deste projeto é que todo o código é em [TypeScript](https://www.typescriptlang.org), criando rotas dinâmicas para segregar back-end e front-end, aproveitando todos os recursos do [React](https://react.dev) e [NextJS](https://nextjs.org). Além disso, usamos tipagem forte para garantir consistência entre back-end e front-end. E também criei uma lógica simples para lidar com as rotas dinâmicas, inspirada no [ExpressJS](https://expressjs.com).

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

Esse projeto visa ajudar pequenas equipes de desenvolvedores que optarem pelo uso de um monólito simples e bem estruturado para suas aplicações. Espero que seja útil para alguém de alguma forma. E, caso queira contribuir, doar ou dar algum feedback por esse trabalho, estarei à disposição em meu **LinkedIn**: https://www.linkedin.com/in/carlos-s-loureiro/ 😉
