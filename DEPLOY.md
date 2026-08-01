# Colocar a loja no ar

Passo a passo do zero até o link para mandar à cliente. Leva cerca de vinte minutos.

---

## 1. Criar o projeto no Supabase

1. Entre em `supabase.com`, crie uma conta e clique em **New project**.
2. Nome: `nebline`. Escolha a região **South America (São Paulo)**, que é a mais perto de Campinas.
3. Defina a senha do banco e **guarde**. Ela não é a senha do painel, é do Postgres.
4. Espere uns dois minutos até o projeto ficar pronto.

## 2. Criar as tabelas

1. No menu lateral, **SQL Editor**, depois **New query**.
2. Cole o conteúdo inteiro de `supabase/schema.sql` e clique em **Run**.
3. Deve aparecer "Success". Em **Table Editor** você verá `pedidos` e `disponibilidade`.

O arquivo pode ser rodado de novo sem quebrar nada, caso precise ajustar depois.

## 3. Criar o login da equipe

1. **Authentication**, **Users**, **Add user**, **Create new user**.
2. Email e senha da equipe da Nebline. **Marque "Auto Confirm User"**, senão a pessoa precisa
   confirmar por email antes de conseguir entrar.
3. Ainda em Authentication, **Sign In / Providers**, **Email**: desligue **Enable sign ups**.
   Sem isso, qualquer pessoa que descobrir o endereço do painel cria uma conta e entra.

Esse é o login que a dona da confeitaria vai usar. Não existe mais senha no código.

## 4. Pegar as chaves

**Project Settings**, **API Keys**. Você precisa de duas coisas:

- **Project URL**
- **anon public** (a chave publicável)

A chave `service_role` **nunca** entra no projeto. Ela ignora todas as regras de segurança.

## 5. Rodar local com o banco ligado

```bash
cp .env.example .env
```

Preencha:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

```bash
npm install
npm run dev
```

Faça um pedido de teste. Ele deve aparecer em **Table Editor**, tabela `pedidos`. Entre no painel
em `/#/admin` com o email e a senha do passo 3. O aviso amarelo de "modo demonstração" some.

## 6. Publicar na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em `vercel.com`, **Add New**, **Project**, e importe o repositório.
3. Framework: **Vite**. Build: `npm run build`. Output: `dist`. Ele detecta sozinho.
4. Em **Environment Variables**, cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
   com os mesmos valores do `.env`.
5. **Deploy**.

As variáveis precisam estar cadastradas **antes** do build. Se esquecer, o site sobe em modo
demonstração e você precisa refazer o deploy depois de adicioná-las.

## 7. Conferir antes de mandar o link

- [ ] O número em `src/lib/config.js` é o da Nebline, não o seu de teste
- [ ] A chave Pix está correta
- [ ] Fez um pedido pelo site publicado e ele apareceu no painel
- [ ] Entrou no painel pelo celular
- [ ] Aceitou um pedido e a mensagem abriu certa no WhatsApp
- [ ] Desligou um item na aba Disponibilidade e ele sumiu da vitrine

---

## O que ainda é provisório

Diga isso à cliente na apresentação, para ela não achar que é o produto final:

- **Fotos dos produtos** são de banco de imagens, não são os doces dela
- **Taxas de entrega por bairro** foram estimadas, precisam da tabela real
- **Preços de encomenda** foram estimados, o cardápio manda consultar a equipe
- Textos da home precisam da revisão dela

## Segurança, o que já está resolvido e o que não está

Resolvido: quem visita o site só consegue criar pedido. Não consegue ler pedido nenhum, nem
o próprio. Os dados dos clientes só aparecem para quem tem login. O painel devolve a pessoa
para a tela de login se a sessão expirar.

Não resolvido: não há limite de quantos pedidos alguém pode criar por minuto. Como o pedido só
vira compromisso quando a equipe aceita no WhatsApp, o risco prático é baixo, mas se um dia
aparecer pedido falso em volume, o caminho é um limite por IP em uma Edge Function. Não vale
fazer agora.
