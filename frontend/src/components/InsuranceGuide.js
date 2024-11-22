import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Card,
  CardBody,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Tag,
  HStack,
  Textarea,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const InsuranceGuide = () => {
  const [query, setQuery] = useState({
    budget: 5000,
    family_size: 1,
    pre_existing_conditions: '',
    location: '',
  });
  const [recommendations, setRecommendations] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedQuery = {
        ...query,
        pre_existing_conditions: query.pre_existing_conditions
          .split(',')
          .map((condition) => condition.trim())
          .filter((condition) => condition !== ''),
      };

      const response = await fetch('http://localhost:8000/api/insurance/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedQuery),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);

      toast({
        title: 'Success',
        description: 'Insurance recommendations generated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Insurance Requirements</Heading>
            <FormControl>
              <FormLabel>Monthly Budget (₹)</FormLabel>
              <NumberInput
                value={query.budget}
                onChange={(value) => setQuery({ ...query, budget: parseFloat(value) })}
                min={1000}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Family Size</FormLabel>
              <NumberInput
                value={query.family_size}
                onChange={(value) => setQuery({ ...query, family_size: parseInt(value) })}
                min={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Pre-existing Conditions (comma-separated)</FormLabel>
              <Textarea
                value={query.pre_existing_conditions}
                onChange={(e) => setQuery({ ...query, pre_existing_conditions: e.target.value })}
                placeholder="e.g., diabetes, hypertension"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                value={query.location}
                onChange={(e) => setQuery({ ...query, location: e.target.value })}
                placeholder="Enter your city"
              />
            </FormControl>

            <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
              Get Recommendations
            </Button>
          </CardBody>
        </Card>

        {recommendations && (
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Recommended Insurance Plans</Heading>
              <List spacing={4}>
                {recommendations.map((plan, index) => (
                  <ListItem key={index} p={4} borderWidth={1} borderRadius="md">
                    <Heading size="sm" mb={2}>{plan.plan_name}</Heading>
                    <HStack spacing={4} mb={2}>
                      <Tag colorScheme="green">Premium: ₹{plan.premium}/month</Tag>
                      <Tag colorScheme="blue">Coverage: ₹{plan.coverage}</Tag>
                    </HStack>
                    <Text fontWeight="bold" mb={2}>Features:</Text>
                    <List spacing={2}>
                      {plan.features.map((feature, fIndex) => (
                        <ListItem key={fIndex}>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default InsuranceGuide;
