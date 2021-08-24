import { Box, Image } from '@chakra-ui/react';
import ParkingImage from 'assets/parking.png';
import LeftTaxi01 from 'assets/left-taxi-01.png';
import RightTaxi02 from 'assets/right-taxi-02.png';
import LeftTaxi03 from 'assets/left-taxi-03.png';
import RightTaxi04 from 'assets/right-taxi-04.png';
import { useQuery } from 'react-query';
import axios from 'axios';

const taxis = [LeftTaxi01, RightTaxi02, LeftTaxi03, RightTaxi04];

const Parking = () => {
  const { data } = useQuery(
    'park',
    async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'/park');
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
    <Box position='relative' overflow='hidden'>
      <Image src={ParkingImage} />
      {data &&
        data['Place Plein'].map((e) => (
          <Image
            key={e}
            position='absolute'
            top='0px'
            left='0px'
            src={taxis[e - 1]}
          />
        ))}
    </Box>
  );
};

export default Parking;
