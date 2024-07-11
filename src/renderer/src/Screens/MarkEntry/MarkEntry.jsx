/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../Components/Navbar';
import '../../Components/Sidebar/Home.scss';
import {
    Box, Table, TableCaption, Thead, Tbody, Tr, Th, Td, Input,
    Text,
    SimpleGrid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useReactToPrint } from 'react-to-print';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function MarkEntry() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: modal2IsOpen, onOpen: openModal2, onClose: closeModal2 } = useDisclosure();
    const { isOpen: modal3IsOpen, onOpen: openModal3, onClose: closeModal3 } = useDisclosure();


    const [studentDetails, setStudentDetails] = useState([]);
    const [coMarks, setCoMarks] = useState([]);
    const [totalMark, setTotalMark] = useState(0)
    let deptt = localStorage.getItem("dept");
    let yearr = localStorage.getItem("year");
    const examType = localStorage.getItem("examtype")


    useEffect(() => {
        const fetchData = async () => {

        };

        fetchData();
    }, []);

    useEffect(() => {
        let dept = localStorage.getItem("dept");
        let year = localStorage.getItem("year");
        let sem = localStorage.getItem("sem");
        let subcode = localStorage.getItem("subcode");

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getstudentdetails', {
                    params: {
                        dept: dept,
                        year: year,
                        sem: sem,
                        subcode: subcode
                    }
                });
                if (response.data) {
                    console.log(response.data);
                    setStudentDetails(response.data);
                    const initialMarks = response.data.map(student => ({
                        Co1: student.Co1,
                        Co2: student.Co2,
                        Co3: student.Co3,
                        Co4: student.Co4,
                        Co5: student.Co5,
                        Co6: student.Co6
                    }));
                    setCoMarks(initialMarks);
                }
            } catch (err) {
                console.log(err.toString());
            }
        };

        fetchData();
    }, []);

    const handleCoMarkChange = (index, coNumber, value) => {
        const updatedCoMarks = [...coMarks];
        updatedCoMarks[index][`Co${coNumber}`] = value;
        setCoMarks(updatedCoMarks);
        setTotalMark(totalMark + parseInt(value))

        sendMarksData(studentDetails[index].Reg_No, studentDetails[index].Student_name, studentDetails[index].Department, studentDetails[index].Course_name, studentDetails[index].Year, studentDetails[index].Sem, `${"Co" + coNumber}`, value, studentDetails[index].Course_id);
    };

    const sendMarksData = async (regNo, studentName, department, subjectName, year, sem, conum, conumValue, courseid) => {
        try {
            const response = await axios.post('http://localhost:5000/postMark', {
                regNo: regNo,
                studentName: studentName,
                department: department,
                year: year,
                subjectName: subjectName,
                courseid: courseid,
                conum: conum,
                conumValue: conumValue,
                sem: sem
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending marks data:', error);
        }
    };

    const calculateTotalMarks = (index) => {
        let total = 0;
        for (let i = 1; i <= 6; i++) {
            total += parseInt(coMarks[index][`Co${i}`]) || 0;
        }
        return total;
    };

    const handleKeyPress = (index, coNumber, event) => {
        if (event.key === 'Enter') {
            console.log(`Enter key pressed in CO${coNumber} for index ${index}`);
        }
    };

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Department Report',
    });

    if (!deptt || !yearr || !studentDetails) {
        return <p>Error: Missing data for printing.</p>;
    }

    const calculateAverage = coMark => {
        let total = 0;
        for (let i = 1; i <= 6; i++) {
            total += parseInt(coMark[`Co${i}`]) || 0;
        }
        return total.toFixed(2) / 6;
    };



    const labels = ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'];
    const calculateAverageCoMarks = () => {
        let totalCoMarks = Array(6).fill(0);

        for (let i = 0; i < studentDetails.length; i++) {
            for (let j = 1; j <= 6; j++) {
                totalCoMarks[j - 1] += parseInt(coMarks[i][`Co${j}`]) || 0;
            }
        }

        return totalCoMarks.map(coTotal => (coTotal / studentDetails.length).toFixed(2));
    };

    const averageCoMarks = calculateAverageCoMarks();
    const data = {
        labels: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'],
        datasets: [{
            label: 'Average Marks for Cycle Test 1',
            data: averageCoMarks,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };


    const options = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };


    const options2 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };



    const options3 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };




    const options4 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };




    const options5 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };



    const options6 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };



    const options7 = {
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    const calculateStudentTotalMarks = (coMarks) => {
        let total = 0;
        for (let i = 1; i <= 6; i++) {
            total += parseInt(coMarks[`Co${i}`]) || 0;
        }
        return total;
    };

    const calculateAverageMarks = () => {
        let totalMarks = 0;
        let numberOfStudents = studentDetails.length;
        for (let i = 0; i < numberOfStudents; i++) {
            totalMarks += calculateStudentTotalMarks(coMarks[i]);
        }
        return totalMarks / numberOfStudents;
    };

    const determineLevel = (totalMarks) => {
        if (totalMarks >= 80) {
            return "Level 1";
        } else if (totalMarks >= 50 && totalMarks < 80) {
            return "Level 2";
        } else {
            return "Level 3";
        }
    };

    const countStudentsByLevel = () => {
        let level1Count = 0;
        let level2Count = 0;
        let level3Count = 0;

        for (let i = 0; i < studentDetails.length; i++) {
            const totalMarks = calculateStudentTotalMarks(coMarks[i]);
            const level = determineLevel(totalMarks);

            switch (level) {
                case "Level 1":
                    level1Count++;
                    break;
                case "Level 2":
                    level2Count++;
                    break;
                case "Level 3":
                    level3Count++;
                    break;
                default:
                    break;
            }
        }

        return { level1Count, level2Count, level3Count };
    };

    const totalMarks = calculateAverageMarks();
    const { level1Count, level2Count, level3Count } = countStudentsByLevel();

    return (
        <>
            <Box className='home'>
                <Box>
                    <Sidebar />
                </Box>
                <Box className='homeContainer'>
                    <Box ml={"4.5rem"}>
                        <Navbar />
                    </Box>
                    <Box ml={"5rem"} flexDirection={"column"} display={"flex"} alignItems={"center"} justifyContent={"center"} className='home-content' mt={100}>
                        <Box maxW={"100%"}>
                            <Box ref={componentRef}>
                                <Box className='flex items-center justify-start p-10'>
                                    <SimpleGrid gap={10} columns={2}>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Department: <span style={{ color: "coral" }}>{deptt}</span>
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Year: <span style={{ color: "coral" }}>{yearr}</span>
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Subject handled by: <span style={{ color: "coral" }}>{studentDetails[0]?.staff_name}</span>
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Subject code: <span style={{ color: "coral" }}>{studentDetails[0]?.Course_id}</span>
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Exam: <span style={{ color: "coral" }}>{examType}</span>
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text className='font-semibold text-lg'>
                                                Subject Name: <span style={{ color: "coral" }}>{studentDetails[0]?.Course_name}</span>
                                            </Text>
                                        </Box>

                                    </SimpleGrid>
                                </Box>
                                <Table>
                                    {/* <TableCaption>Student Details</TableCaption> */}
                                    <Thead>
                                        <Tr>
                                            <Th className='font-bold'>S.Nor</Th>

                                            <Th className='font-bold'>Register Number</Th>
                                            <Th className='font-bold'>Student Name</Th>
                                            {[1, 2, 3, 4, 5, 6].map(coNumber => (
                                                <Th className='font-bold' key={coNumber}>CO{coNumber}
                                                    <Input mt={2} p={-1} />
                                                </Th>
                                            ))}
                                            <Th className='font-bold'>Total Mark
                                                <Input mt={2} p={-1} />
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody width={"100%"}>
                                        {studentDetails.map((item, index) => (
                                            <Tr key={index}>
                                                <Td><Text className='font-semibold'>{index + 1}</Text></Td>

                                                <Td><Text className='font-semibold'>{item.Reg_No}</Text></Td>
                                                <Td><Text className='font-semibold'>{item.Student_name}</Text></Td>
                                                {[1, 2, 3, 4, 5, 6].map(coNumber => (
                                                    <Td key={coNumber}>
                                                        <Input
                                                            textAlign={"center"}
                                                            p={-1}
                                                            border={'2px solid dodgerblue'}
                                                            value={coMarks[index][`Co${coNumber}`] === 0 ? "" : coMarks[index][`Co${coNumber}`]}
                                                            onChange={e => handleCoMarkChange(index, coNumber, e.target.value)}
                                                            onKeyPress={e => handleKeyPress(index, coNumber, e)}
                                                        />
                                                    </Td>
                                                ))}



                                                <Td className='font-semibold'>{calculateTotalMarks(index)}</Td>

                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Box p={5} gap={5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                    <Input width={"30%"} />
                                    <Input width={"30%"} />
                                    <Input width={"30%"} />
                                    <Input width={"30%"} />
                                    <Input width={"30%"} />
                                    <Input width={"30%"} />



                                </Box>
                                <Box mb={10} flexDirection={"row"} gap={10} display={"flex"} alignItems={"center"} justifyContent={"center"} >

                                    <Box>
                                        <Text className='text-2xl font-semibold'>Total</Text>
                                        <Text>Level 1 : {countStudentsByLevel().level1Count} {countStudentsByLevel().level1Count == 1 || 0 ? "student" : "students"}</Text>
                                        <Text>Level 2 : {countStudentsByLevel().level2Count} {countStudentsByLevel().level2Count == 1 || 0 ? "student" : "students"}</Text>

                                        <Text>Level 3 : {countStudentsByLevel().level3Count} {countStudentsByLevel().level3Count == 1 || 0 ? "student" : "students"}</Text>
                                    </Box>



                                    <Box gap={5} p={"1rem"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <Button colorScheme='gray' onClick={handlePrint}>Print Report</Button>
                                        <Button onClick={onOpen} colorScheme='twitter'>Chart</Button>
                                        <Button onClick={openModal2} colorScheme='twitter'>Chart for all test</Button>


                                        <Modal isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>
                                                    <Text className='font-semibold text-lg'>
                                                        Subject code: <span style={{ color: "coral" }}>{studentDetails[0]?.Course_id}</span>
                                                    </Text>
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>

                                                    <Box className='co-averages'>
                                                        <Text as="h1" fontSize="xl" fontWeight="bold">Average for Cycle Test 1</Text>
                                                        <Bar data={data} options={options} />
                                                        {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                    </Box>



                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>



                                        <Modal isOpen={modal2IsOpen} onClose={closeModal2}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>
                                                    <Text className='font-semibold text-lg'>
                                                        Subject code: <span style={{ color: "coral" }}>{studentDetails[0]?.Course_id}</span>
                                                    </Text>
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Box >
                                                        <Box className='co-averages'>
                                                            <Text as="h1" fontSize="xl" fontWeight="bold">Average for CT 2:</Text>
                                                            {/* <Bar data={data2} options={options2} /> */}
                                                            {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                        </Box>

                                                        <Box className='co-averages'>
                                                            <Text as="h1" fontSize="xl" fontWeight="bold">Average for University</Text>
                                                            {/* <Bar data={data3} options={options3} /> */}
                                                            {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                        </Box>

                                                        <Box className='co-averages'>
                                                            <Text as="h1" fontSize="xl" fontWeight="bold">Average for Assignment 1:</Text>
                                                            {/* <Bar data={data4} options={options4} /> */}
                                                            {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                        </Box>
                                                        <Box className='co-averages'>
                                                            <Text as="h1" fontSize="xl" fontWeight="bold">Average for Assignment 2:</Text>
                                                            {/* <Bar data={data5} options={options5} /> */}
                                                            {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                        </Box>
                                                        <Box className='co-averages'>
                                                            <Text as="h1" fontSize="xl" fontWeight="bold">Average for Assignment 3:</Text>
                                                            {/* <Bar data={data6} options={options6} /> */}
                                                            {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                        </Box>
                                                    </Box>

                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} onClick={openModal3}>
                                                        Overall Attainment
                                                    </Button>
                                                    <Button colorScheme='blue' mr={3} onClick={closeModal2}>
                                                        Close
                                                    </Button>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Box>



                                    <Modal isOpen={modal3IsOpen} onClose={closeModal3}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            {/* <ModalHeader>
                                                    <Text className='font-semibold text-lg'>
                                                        Subject code: <span style={{ color: "coral" }}>{studentDetails[0]?.Course_id}</span>
                                                    </Text>
                                                </ModalHeader> */}
                                            <ModalCloseButton />
                                            <ModalBody>

                                                <Box className='co-averages'>
                                                    <Text as="h1" fontSize="xl" fontWeight="bold">Overall Direct Attainment</Text>
                                                    {/* <Bar data={data7} options={options7} /> */}
                                                    {/* <Bar data={{ labels: dataChart.map(({ label }) => label), datasets: [{ data: dataChart.map(({ value }) => value) }] }} options={options} /> */}
                                                </Box>



                                            </ModalBody>
                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={closeModal3}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>





                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>
    );
}

export default MarkEntry;
