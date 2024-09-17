const Quote = require("inspirational-quotes");
import { NextResponse } from "next/server";
export async function GET() {
  const quote = Quote.getQuote();
  return NextResponse.json(quote);
}
