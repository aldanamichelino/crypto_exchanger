export const fetchAndFormatCryptoCoins = async () => {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

  const response = await fetch(url);
  const parseResponseToJson = await response.json();

  const criptoCoinsArray = parseResponseToJson.Data.map(crypto => {
    const cryptoCoinObject = {
      id: crypto.CoinInfo.Name,
      name: crypto.CoinInfo.FullName

    }

    return cryptoCoinObject;
  });

  return criptoCoinsArray;
};

export const getCryptoCoinExchangeInfo = async (coin, cryptoCoin) => {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCoin}&tsyms=${coin}`;

  const response = await fetch(url);
  const parseResponseToJson = await response.json();

  return parseResponseToJson;
}


