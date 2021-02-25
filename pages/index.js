import { Provider } from 'react-redux';
import ChartComponent from '../components/ChartComponents/ChartComponent';
import { GlobalStyles } from './global.styles';

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <ChartComponent />
    </>
  );
}
