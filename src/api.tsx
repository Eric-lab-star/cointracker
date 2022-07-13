const BASE = "https://api.coinpaprika.com/v1";

export async function getCoins() {
  const response = await fetch(`${BASE}/coins`);
  const json = response.json();
  return json;
}

export async function getCoin(coin_id?: string) {
  const resonse = await fetch(`${BASE}/coins/${coin_id}`);
  const json = resonse.json();
  return json;
}

export async function getRecentPrice(coinId: string | undefined) {
  const response = await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/latest/`
  );
  const json = response.json();
  return json;
}
