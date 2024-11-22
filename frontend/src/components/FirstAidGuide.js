import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Card,
  CardBody,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { MdCheckCircle, MdWarning } from 'react-icons/md';

const FirstAidGuide = () => {
  const [emergency, setEmergency] = useState({
    condition: '',
    location: '',
    severity: 'moderate',
  });
  const [instructions, setInstructions] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/emergency/firstaid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emergency),
      });

      const data = await response.json();
      setInstructions(data);

      toast({
        title: 'Success',
        description: 'First aid instructions generated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate first aid instructions.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Card>
          <CardBody>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <Heading size="md">Emergency First Aid Guide</Heading>
              
              <FormControl>
                <FormLabel>Emergency Condition</FormLabel>
                <Input
                  value={emergency.condition}
                  onChange={(e) =>
                    setEmergency({ ...emergency, condition: e.target.value })
                  }
                  placeholder="Describe the emergency condition"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location on Body</FormLabel>
                <Input
                  value={emergency.location}
                  onChange={(e) =>
                    setEmergency({ ...emergency, location: e.target.value })
                  }
                  placeholder="Specify location on body"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Severity Level</FormLabel>
                <Select
                  value={emergency.severity}
                  onChange={(e) =>
                    setEmergency({ ...emergency, severity: e.target.value })
                  }
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </Select>
              </FormControl>

              <Button type="submit" colorScheme="blue">
                Get First Aid Instructions
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {instructions && (
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">First Aid Instructions</Heading>
                
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      These are general first aid guidelines. For severe emergencies,
                      always call emergency services immediately.
                    </AlertDescription>
                  </Box>
                </Alert>

                <List spacing={3}>
                  {instructions.steps?.map((step, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={MdCheckCircle} color="green.500" />
                      {step}
                    </ListItem>
                  ))}
                </List>

                {instructions.warnings?.length > 0 && (
                  <Alert status="warning">
                    <AlertIcon as={MdWarning} />
                    <Box>
                      <AlertTitle>Warnings</AlertTitle>
                      <List spacing={2}>
                        {instructions.warnings.map((warning, index) => (
                          <ListItem key={index}>{warning}</ListItem>
                        ))}
                      </List>
                    </Box>
                  </Alert>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default FirstAidGuide;
