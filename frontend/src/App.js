import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import SymptomChecker from './components/SymptomChecker';
import InsuranceGuide from './components/InsuranceGuide';
import FirstAidGuide from './components/FirstAidGuide';
import MedicineDelivery from './components/MedicineDelivery';

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Container maxW="container.xl">
            <VStack spacing={8}>
              <Heading as="h1" size="xl" color="blue.500">
                Healthcare AI Platform
              </Heading>
              
              <Tabs isFitted variant="enclosed" width="100%">
                <TabList mb="1em">
                  <Tab>Symptom Checker</Tab>
                  <Tab>Insurance Guide</Tab>
                  <Tab>First Aid</Tab>
                  <Tab>Medicine Delivery</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel>
                    <SymptomChecker />
                  </TabPanel>
                  <TabPanel>
                    <InsuranceGuide />
                  </TabPanel>
                  <TabPanel>
                    <FirstAidGuide />
                  </TabPanel>
                  <TabPanel>
                    <MedicineDelivery />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Container>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
