import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { memo } from 'react';
import GaugeChart from 'react-gauge-chart';
import { useQuery } from 'react-query';
import { responsive } from 'utils';

const Chart = memo(({ percent }) => {
  return (
    <GaugeChart
      id='gauge-chart2'
      colors={['#5C429C', '#CE5EF5']}
      nrOfLevels={8}
      percent={percent}
    />
  );
});

const ParkingPercentage = () => {
  const { data } = useQuery(
    'park',
    async () => {
      const response = await axios.get('https://189d2a7665dd.ngrok.io/park');
      return response.data;
    },
    {
      staleTime: 0,
      refetchInterval: 10,
      refetchIntervalInBackground: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  );

  return (
    <Box
      p={responsive('10px', '20px')}
      sx={{
        text: {
          fill: '#5C429C !important',
          fontFamily: "'Nunito', sans-serif",
        },
        svg: {
          w: '100%',
        },
      }}
    >
      <Chart percent={((data && data['Place Plein']) || []).length / 8} />
    </Box>
  );
};

export default ParkingPercentage;
