import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (request: NextRequest) => {
  try {
    const { title, price,description } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description:description,
            },
            unit_amount: parseFloat(price) * 100,  
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/categories`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  }catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
}
};
