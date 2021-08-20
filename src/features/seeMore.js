import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { responsive } from 'utils';
import Modal from './modal';
import ParkingPercentage from './parkingPercentage';
import { ReactComponent as ProfitIcon } from 'assets/profit.svg';
import numberFormatter from 'number-formatter';
import Chart from 'react-google-charts';
import { useQuery } from 'react-query';
import axios from 'axios';
import { memo } from 'react';

const Content = ({ name, children }) => {
  return (
    <Box>
      <Text
        color='purple.500'
        fontFamily="'Galada', cursive"
        fontSize={responsive('1em', '1.2em')}
      >
        {name}
      </Text>
      <Box>{children}</Box>
    </Box>
  );
};

const SeeMore = ({ isOpen, onClose }) => {
  const { data: kmProfitData } = useQuery(
    'km_profit',
    async () => {
      const response = await axios.get(
        'https://189d2a7665dd.ngrok.io/km_profit',
      );
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

  const { data: taxiActivitiesData } = useQuery(
    'taxi_activities',
    async () => {
      const response = await axios.get(
        'https://189d2a7665dd.ngrok.io/taxi_activities',
      );
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

  const { data: allKmProfitData } = useQuery(
    'all_km_profit',
    async () => {
      const response = await axios.get(
        'https://189d2a7665dd.ngrok.io/all_km_profit',
      );
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
    <Modal w='80%' maxW='800px' isOpen={isOpen} onClose={onClose}>
      <Grid
        templateColumns={responsive('repeat(1, 1fr)', 'repeat(2, 1fr)')}
        gap={10}
        mt='50px'
      >
        <GridItem>
          <Content name='Parking Place'>
            <ParkingPercentage />
          </Content>
        </GridItem>
        <GridItem>
          <Content name='Average mileage traveled and profit'>
            <AMTPChart data={allKmProfitData} />
          </Content>
        </GridItem>
        <GridItem>
          <Content name='Cumulative mileage and profit'>
            <Flex align='center' flexDir='column' mt='10px'>
              <ProfitIcon />
              <Flex w='80%' justify='space-evenly' mt='10px'>
                <Text
                  fontWeight='bold'
                  color='purple.500'
                  fontSize={responsive('1em', '1.2em')}
                  fontFamily="'Nunito', sans-serif"
                >
                  {numberFormatter(
                    '#,##0.####',
                    kmProfitData ? kmProfitData['Kilometrage'] : 0,
                  )}
                  Km
                </Text>
                <Text
                  fontWeight='bold'
                  color='purple.500'
                  fontSize={responsive('1em', '1.2em')}
                  fontFamily="'Nunito', sans-serif"
                >
                  $
                  {numberFormatter(
                    '#,##0.####',
                    kmProfitData ? kmProfitData['Profit'] : 0,
                  )}
                </Text>
              </Flex>
            </Flex>
          </Content>
        </GridItem>
        <GridItem>
          <Content name='Taxis Activities'>
            <TaxiActivitiesChart data={taxiActivitiesData} />
          </Content>
        </GridItem>
      </Grid>
    </Modal>
  );
};

const TaxiActivitiesChart = memo(({ data }) => {
  return (
    <Chart
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={[
        ['Task', 'Hours per Day'],
        ['Work', 4 * 720 - (data ? data['Total Hours'] : 0)],
        ['Park', data ? data['Total Hours'] : 0],
      ]}
      options={{
        // Just add this option
        is3D: true,
        backgroundColor: 'transparent',
      }}
    />
  );
});

const AMTPChart = memo(({ data }) => {
  return (
    <Chart
      chartType='BarChart'
      loader={<div>Loading Chart</div>}
      data={[
        ['Taxi', 'Mileage', 'Profit'],
        ...(data
          ? data.map((e, index) => [`T0${index + 1}`, e.Kilometrage, e.Profit])
          : []),
      ]}
      options={{
        chartArea: { width: '50%' },
        colors: ['#b0120a', '#ffab91'],
        hAxis: {
          minValue: 0,
        },
        vAxis: {
          title: 'Taxi',
        },
        backgroundColor: 'transparent',
      }}
    />
  );
});

export default SeeMore;
