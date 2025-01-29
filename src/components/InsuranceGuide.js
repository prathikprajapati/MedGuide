import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const InsuranceGuide = () => {
  const [age, setAge] = useState(25);
  const [healthCondition, setHealthCondition] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    // Basic validation
    if (!age || !healthCondition) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Process the insurance recommendation
    let recommendation = '';
    if (age < 30) {
      recommendation = 'Basic Health Insurance Plan';
    } else if (age < 50) {
      recommendation = 'Comprehensive Health Insurance Plan';
    } else {
      recommendation = 'Senior Citizen Health Insurance Plan';
    }

    toast({
      title: 'Insurance Recommendation',
      description: recommendation,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={6}>
        <Heading>Insurance Guide</Heading>
        <Text>Find the right insurance plan for you</Text>

        <FormControl>
          <FormLabel>Age</FormLabel>
          <NumberInput
            min={1}
            max={100}
            value={age}
            onChange={(value) => setAge(parseInt(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Health Condition</FormLabel>
          <Select
            placeholder="Select health condition"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Get Recommendation
        </Button>
      </Stack>
    </Container>
  );
};

export default InsuranceGuide;
