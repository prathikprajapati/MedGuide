import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Text,
  useToast,
  Card,
  CardBody,
  Heading,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    description: '',
    severity: 1,
    duration: '',
  });
  const [diagnosis, setDiagnosis] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/symptom-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(symptoms),
      });
      
      const data = await response.json();
      setDiagnosis(data);
      
      toast({
        title: 'Analysis Complete',
        description: 'Your symptoms have been analyzed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze symptoms. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addSymptom = () => {
    if (currentSymptom.description && currentSymptom.duration) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom({
        description: '',
        severity: 1,
        duration: '',
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Add Your Symptoms</Heading>
            <FormControl>
              <FormLabel>Symptom Description</FormLabel>
              <Input
                value={currentSymptom.description}
                onChange={(e) =>
                  setCurrentSymptom({ ...currentSymptom, description: e.target.value })
                }
                placeholder="Enter symptom description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Severity (1-10)</FormLabel>
              <Select
                value={currentSymptom.severity}
                onChange={(e) =>
                  setCurrentSymptom({ ...currentSymptom, severity: parseInt(e.target.value) })
                }
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                value={currentSymptom.duration}
                onChange={(e) =>
                  setCurrentSymptom({ ...currentSymptom, duration: e.target.value })
                }
                placeholder="e.g., 2 days, 1 week"
              />
            </FormControl>

            <Button mt={4} colorScheme="blue" onClick={addSymptom}>
              Add Symptom
            </Button>
          </CardBody>
        </Card>

        {symptoms.length > 0 && (
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Added Symptoms</Heading>
              <List spacing={3}>
                {symptoms.map((symptom, index) => (
                  <ListItem key={index}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {symptom.description} - Severity: {symptom.severity}, Duration: {symptom.duration}
                  </ListItem>
                ))}
              </List>
              <Button mt={4} colorScheme="green" onClick={handleSubmit}>
                Analyze Symptoms
              </Button>
            </CardBody>
          </Card>
        )}

        {diagnosis && (
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Diagnosis Results</Heading>
              <Text mb={2}>Preliminary Diagnosis: {diagnosis.diagnosis}</Text>
              <Text mb={2}>Severity: {diagnosis.severity}</Text>
              
              <Text fontWeight="bold" mt={4}>Recommendations:</Text>
              <List spacing={3}>
                {diagnosis.recommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    {rec}
                  </ListItem>
                ))}
              </List>

              <Text fontWeight="bold" mt={4}>Nearby Doctors:</Text>
              <List spacing={3}>
                {diagnosis.nearby_doctors.map((doctor, index) => (
                  <ListItem key={index}>
                    <ListIcon as={MdCheckCircle} color="blue.500" />
                    {doctor.name} - {doctor.speciality} ({doctor.distance})
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

export default SymptomChecker;
