import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelectCoin } from '../hooks/useSelectCoin';
import { coins } from '../data/coins';
import { fetchAndFormatCryptoCoins } from '../data/API';
import { Error } from './Error';

const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  cursor: pointer;
  margin-top: 30px;

  &:hover{
    background-color: #7A7DFE;

  }
`;

export const Form = ({ setCoins }) => {

  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [error, setError] = useState(false);

  const [coin, SelectCoin] = useSelectCoin('Elige tu moneda', coins);
  const [cryptoCoin, SelectCryptoCoin] = useSelectCoin('Elige tu cryptomoneda', cryptoCoins);

  useEffect(() => {

    const getCryptoCoinsInfo = async () => {
      try {
        const cryptoCoinInfo = await fetchAndFormatCryptoCoins();
        setCryptoCoins(cryptoCoinInfo);
      } catch (error) {
        console.error('error', error);
      }
    }

    getCryptoCoinsInfo();

  }, []);
  

  const handleSubmit = e => {
    e.preventDefault();

    if([coin, cryptoCoin].includes('')){
      setError(true);

      return;
    }

    setError(false);
    setCoins({coin, cryptoCoin});
  }
  

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectCoin/>
        <SelectCryptoCoin/>
        
        <InputSubmit type="submit" />
      </form>
    </>
  )
}
