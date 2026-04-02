import { SettingsIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react'
import { ReactNode, useState } from 'react';

interface SideDrawerProps {
  children?: ReactNode;
}

const SideDrawer = ({ children }: SideDrawerProps) => {

    const [open, setOpen] = useState(false)

    return ( 
        <>
            <SettingsIcon onClick={() => {setOpen(true)}}
                boxSize="50px"
                p="13px"
                borderRadius="50%"
                boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                bgColor="#F8F8FF"
                _hover={{bgColor: "rgba(0,0,0,0.10)"}}
                transition="0.2s"
                cursor="pointer"
                ml="1rem"
            />

            <Flex
                pos="absolute"
                top="0px"
                flexDir="column"
                w="500px"
                h="100vh"
                bgColor="rgba(248, 248, 255, 0.75)"
                transform={open ? "translateX(0px)" : "translateX(-510px)"}
                transition="0.25s"
                boxShadow="4px 0px 4px rgba(0,0,0,0.25)"
                borderRadius="0px 10px 10px 0px"
                zIndex="2"
            >
                <Flex 
                    flexDir="column"
                    justify="center"
                    align="flex-end"
                    h="50px"
                >
                    <CloseIcon onClick={() => {setOpen(false)}}
                        _hover= {{bgColor: "rgba(0,0,0,0.10)"}}
                        borderRadius="5px"
                        cursor="pointer"
                        transition="0.2s"
                        boxSize="28px"
                        padding="5px"
                        mr="10px"
                    />
                </Flex>
            
                { children}
                
            </Flex>
            {open && <Box onClick={() => {setOpen(false)}}
                pos="absolute"
                top="0px"
                left="0px"
                w="100vw"
                h="100vh"
                bgColor="rgba(0,0,0,0.3)"
                zIndex="1"
                backdropFilter="blur(2px)"
            />}
        </>
     );
}
 
export default SideDrawer;
