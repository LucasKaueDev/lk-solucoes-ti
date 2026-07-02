# Arquitetura do Projeto

## Filosofia

O projeto utiliza uma arquitetura modular.

Mesmo sendo desenvolvido com HTML, CSS e JavaScript puro, todas as decisões arquiteturais visam facilitar manutenção, escalabilidade e integração futura.

---

# Camadas

Frontend

↓

Config

↓

Services

↓

Utils

↓

Data

↓

Integração futura

↓

API LK Soluções Tech

---

# Responsabilidades

index.html

Responsável apenas pela estrutura.

---

main.js

Inicialização do projeto.

Não conterá regras de negócio.

---

Services

Responsáveis por acesso aos dados.

Hoje:

JSON

Futuro:

API

---

Utils

Funções reutilizáveis.

---

Config

Configurações globais.

---

Data

Dados estáticos.

---

Components

Componentes reutilizáveis.

---

Pages

Novas páginas institucionais.

---

Objetivo Final

O site deverá ser capaz de consumir APIs da LK Soluções Tech sem necessidade de reestruturação.