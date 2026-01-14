<div align="center">

# AbacatePay ESLint Plugin 🥑

**Um plugin ESLint que prevêm o vazamento de API keys da AbacatePay no seu código**

Proteja a sua aplicação de acidentalmente commitar API keys da AbacatePay, forçando as melhores práticas de código.

---

</div>
<div align="center">

## Usando

Para instalar o nosso plugin, você pode instalar com o seu *Package Manager* favorito

</div>

```bash
bun add -d @abacatepay/eslint-plugin
npm install -d @abacatepay/eslint-plugin
pnpm add -d @abacatepay/eslint-plugin
```

<div align="center">

## Configuração

Para configurar o plugin na sua configuração, nós recomendamos usar o plugin no formato *flat*

</div>

```js
import abacatepay from '@abacatepay/eslint-plugin'

export default [
    {
        plugins: {
            abacatepay,
        },
        rules: {
            'abacatepay/no-secret-key': 'error',
        },
    },
]
```

<div align="center">

## Regras

`abacatepay/no-secret`

Disallows hardcoded AbacatePay secret keys anywhere in your code.

**Incorrect**

</div>

```ts
const client = new AbacatePay("abc_dev_xxxxxxxxxxxxxxxxxxxxxxx");
```

```ts
fetch("https://api.abacatepay.com/v1/store/get", {
    headers: {
        Authorization: 'Bearer abc_dev_xxxxxxxxxxxxxxxxxxxxxxx',
    },
});
```

```ts
const key = `abc_prod_xxxxxxxxxxxxxxxxxxxxxxx`;
```

<div align="center">

**Correct**

</div>

```ts
const client = new AbacatePay(process.env.ABACATEPAY_API_KEY);
```
<div align="center">

# Autofix & Sugestões

Sempre que possível, a regra fornece um autofix seguro:

</div>

`- "abc_prod_xxxxxxxxxxxxxxxxxxxxxxx"`</br>
`+ process.env.ABACATEPAY_API_KEY`
