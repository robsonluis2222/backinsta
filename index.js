const express = require('express');
const bodyParser = require('body-parser');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Substitua pelo seu token de acesso real
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-5799179016583335-091823-2c10877ac69dc9dc772c7a85babb2e74-677465922' });

app.post('/api/recharge', async (req, res) => {
  const { rechargeValue } = req.body;

  const payment = new Payment(client);
  const body = {
    "items": [
      {
        "id": 1,
        "title": "SERVICO INSTASIZE",
        "quantity": 1,
        "currency_id": "BRL",
        "unit_price": parseFloat(rechargeValue),
      }
    ],
    "back_urls": {
      "success": "http://api-rbsoft.shop/sucess",
      "failure": "http://api-rbsoft.shop/failure",
      "pending": "http://api-rbsoft.shop/pending",
    },
    "auto_return": "all",
  };

  try {
    const response = await payment.create({ body });
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
