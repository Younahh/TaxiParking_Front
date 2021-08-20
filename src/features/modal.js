import {
  Box,
  Flex,
  Portal,
  CloseButton,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { responsive } from 'utils';

const Modal = ({ w = '50%', maxW = '600px', isOpen, onClose, children }) => {
  const ref = useRef();

  useOutsideClick({
    ref,
    handler: onClose,
  });
  return isOpen ? (
    <Portal>
      <Flex
        position='absolute'
        top='0px'
        left='0px'
        bgColor='rgba(0, 0, 0, 0.45)'
        w='100%'
        h='100%'
        justify='center'
        align='center'
      >
        <Box
          bgColor='#E4EAF6'
          ref={ref}
          p={responsive('10px', '20px')}
          borderRadius={16}
          w={responsive('100%', w)}
          maxW={responsive('initial', maxW)}
          h={responsive('100%', 'initial')}
          maxH='100vh'
          overflow='auto'
          pos='relative'
        >
          <CloseButton
            position='absolute'
            top={responsive('10px', '20px')}
            right={responsive('10px', '20px')}
            onClick={onClose}
          />
          {children}
        </Box>
      </Flex>
    </Portal>
  ) : null;
};

export default Modal;
