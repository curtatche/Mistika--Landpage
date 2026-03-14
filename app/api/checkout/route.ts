import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

export async function POST() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Mercado Pago Access Token not configured' },
      { status: 500 }
    );
  }

  const client = new MercadoPagoConfig({
    accessToken: accessToken,
  });

  const preference = new Preference(client);

  try {
    const body = {
      items: [
        {
          id: 'mistika-desafio-30',
          title: 'Mistika — O Despertar (Jornada de 30 Dias)',
          description: '30 dias de acompanhamento diário + bônus exclusivos',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 49.90,
        },
      ],
      payment_methods: {
        installments: 10,
        default_installments: 1,
      },
      back_urls: {
        success: `${process.env.APP_URL}/cadastro`,
        failure: `${process.env.APP_URL}/erro`,
        pending: `${process.env.APP_URL}/pendente`,
      },
      auto_return: 'approved',
      statement_descriptor: 'MISTIKA APP',
      external_reference: `mistika-${Date.now()}`,
    };

    const result = await preference.create({ body });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error('Mercado Pago Error:', error);
    return NextResponse.json(
      { error: 'Failed to create preference' },
      { status: 500 }
    );
  }
}
