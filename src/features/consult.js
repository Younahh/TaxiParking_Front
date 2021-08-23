import {
  Flex,
  Text,
  Button,
  useBreakpointValue,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { GrPersonalComputer } from 'react-icons/gr';
import { responsive } from 'utils';
import Modal from './modal';
import { useToast } from '@chakra-ui/react';

const Consult = ({ isOpen, onClose }) => {
  const pcSize = useBreakpointValue(responsive('18px', '26px'));
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    const taxiId = parseInt(e.target[0].value);
    const option = e.target[1].value;

    let response = null;
    // eslint-disable-next-line default-case
    switch (option) {
      case 'option1':
        response = await axios.get(
          'https://taxiparking.herokuapp.com/searchtaxi/' + taxiId,
        );

        const park = response.data['Taxi park'];
        if (park == null){
          toast({
            title: 'Affected Taxi',
            description: `Your Taxi is not in the Park`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }else{
          toast({
            title: 'Affected Taxi',
            description: `Taxi is in Park (${park})`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        break;
      case 'option2':
        response = await axios.get(
          'https://taxiparking.herokuapp.com/searchplace/' + taxiId,
        );

        const { Park, Taxi } = response.data;
        if (Park == null){
          toast({
            title: 'Empty Place',
            description: `The Park is Full`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }else {
          toast({
            title: 'Empty Place',
            description: `Please park Taxi (${Taxi}) in Park (${Park})`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex
        align='center'
        justify='center'
        pt={responsive('10px', '20px')}
        sx={{
          path: {
            stroke: 'purple.500',
          },
        }}
      >
        <GrPersonalComputer size={pcSize} />
        <Text
          fontFamily="'Galada', cursive"
          fontSize={responsive('1.4em', '2em')}
          ml={responsive('5px', '10px')}
          color={'purple.500'}
        >
          Consult
        </Text>
      </Flex>
      <form onSubmit={onSubmit}>
        <Flex align='center' flexDir='column' mt={responsive('20px', '40px')}>
        <Text
          fontFamily="'Galada', cursive"
          fontSize={responsive('0.8em', '1.2em')}
          ml={responsive('0px', '5px')}
          color={'purple.500'}
        >
          Please type Number of affected Taxi
        </Text>
          <Input
            type='number'
            name='numberOfTaxis'
            placeholder='Number of taxis'
            color= 'purple.500'
            borderColor='purple.500'
            borderWidth='2px'
            borderRadius={16}
            required
          />
          <Select
            mt={responsive('10px', '20px')}
            color='purple.500'
            borderColor='purple.500'
            borderWidth='2px'
            borderRadius={16}
            placeholder='Please Choose'
            required
          >
            <option value='option1'>Search affected taxi</option>
            <option value='option2'>Search empty place</option>
          </Select>
          <Button
            type='submit'
            mt={responsive('20px', '40px')}
            colorScheme='purple'
            fontFamily="'Nunito', sans-serif"
            fontSize={responsive('1em', '1.2em')}
            borderRadius={16}
            px={responsive('30px', '40px')}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default Consult;
