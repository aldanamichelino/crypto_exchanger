import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Form } from './components/Form';
import { Result } from './components/Result';
import { Spinner } from './components/Spinner';
import cryptoimg from './img/imagen-criptos.png';
import { getCryptoCoinExchangeInfo } from './data/API';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 80px, 0, 50px, 0;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

  const [coins, setCoins] = useState({});
  const [exchangeInfo, setExchangeInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(Object.keys(coins).length > 0){
      const { coin, cryptoCoin } = coins;

      const requestGetCryptoCoinExchangeInfo = async () => {
        setLoading(true);

        try {
          const cryptoCoinExchangeInfo = await getCryptoCoinExchangeInfo(coin, cryptoCoin);
          setExchangeInfo(cryptoCoinExchangeInfo.DISPLAY[cryptoCoin][coin]);
          setLoading(false);
        } catch (error) {
          console.error('error', error);
          setLoading(false);
        }
      }

      requestGetCryptoCoinExchangeInfo();
    }
  }, [coins]);

  return (
    <Container>
      <Image src={cryptoimg} alt="image of cryptocoins"/>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Form setCoins={setCoins}/>
        {loading && <Spinner />}
        {!loading && exchangeInfo.PRICE && <Result exchangeInfo={exchangeInfo} />}
      </div>
    </Container>
  )
}

export default App;
