import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Taxi from 'assets/taxi.png';
import { Consult, Parking, ParkingPercentage, SeeMore } from 'features';
import { useEffect } from 'react';
import { responsive } from 'utils';

const Actions = ({ show }) => {
  const {
    isOpen: isSeeMoreOpen,
    onOpen: onSeeMoreOpen,
    onClose: onSeeMoreClose,
  } = useDisclosure();

  const {
    isOpen: isConsultOpen,
    onOpen: onConsultOpen,
    onClose: onConsultClose,
  } = useDisclosure();

  useEffect(() => {
    onSeeMoreClose();
    onConsultClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return show ? (
    <>
      <ParkingPercentage />
      <Flex p={responsive('10px', '20px')}>
        <Button
          flex='1'
          colorScheme='purple'
          mr={responsive('5px', '10px')}
          py={responsive('20px', '30px')}
          fontSize={responsive('1em', '1.2em')}
          fontFamily="'Nunito', sans-serif"
          onClick={onSeeMoreOpen}
          borderRadius={16}
        >
          See More
        </Button>
        <Button
          flex='1'
          colorScheme='purple'
          ml={responsive('5px', '10px')}
          fontFamily="'Nunito', sans-serif"
          py={responsive('20px', '30px')}
          fontSize={responsive('1em', '1.2em')}
          onClick={onConsultOpen}
          borderRadius={16}
        >
          Consult
        </Button>
      </Flex>
      <SeeMore isOpen={isSeeMoreOpen} onClose={onSeeMoreClose} />
      <Consult isOpen={isConsultOpen} onClose={onConsultClose} />
    </>
  ) : null;
};

const App = () => {
  const isSmallScreen = useBreakpointValue(responsive(true, false));

  return (
    <Box
      bgColor='#E4EAF6'
      h={responsive('calc(100vh - 20px)', 'calc(100vh - 40px)')}
      overflow='auto'
      borderRadius={16}
      p={responsive('10px', '20px')}
      position='relative'
    >
      <Box
        position='absolute'
        w={responsive('60px', '120px')}
        h={responsive('60px', '120px')}
        sx={{
          svg: {
            w: '100%',
            h: '100%',
          },
        }}
      >
        <Logo />
      </Box>
      <Flex justify='center' pt={responsive('10px', '20px')}>
        <Text
          color='#535A7C'
          fontFamily="'Galada', cursive"
          fontSize={responsive('1.6em', '4em')}
        >
          Taxi Parking
        </Text>
      </Flex>
      <Flex
        mt={responsive('60px', '80px')}
        flexDirection={responsive('column', 'row')}
      >
        <Flex flexDirection='column' flex='1'>
          <Box p={responsive('10px', '20px')}>
            <Image alignSelf='center' src={Taxi} />
          </Box>
          <Actions show={!isSmallScreen} />
        </Flex>
        <Flex justify='center' flex='1' p={responsive('10px', '20px')}>
          <Parking />
        </Flex>
        <Actions show={isSmallScreen} />
      </Flex>
    </Box>
  );
};

export default App;
