import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import '../../Components/Sidebar/Home.scss'
import {
    Box, Stack, FormLabel, FormControl, Select, Button, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Divider,
    Text
} from '@chakra-ui/react'
import axios from 'axios';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const navigate = useNavigate()
    const years = generateYears(2023, 2080);

    function generateYears(start, end) {
        const years = [];
        for (let year = start; year <= end; year++) {
            years.push(`${year}-${year + 1}`);
        }
        return years;
    }


    const [selectedOptionDepartment, setSelectedOptionDepartment] = useState('');
    const [selectedOptionSemester, setSelectedOptionSemester] = useState('');
    const [selectedOptionYear, setSelectedOptionYear] = useState('');
    const [selectedOptionAcademicYear, setSelectedOptionAcademicYear] = useState('');

    const [selectedOptionSubject, setSelectedOptionSubject] = useState('');
    const [selectedOptionExam, setSelectedOptionExam] = useState('');


    localStorage.setItem("examtype", selectedOptionExam)

    const [courseDetail, setcourseDetail] = useState([])
    const [studentDetails, setstudentDetails] = useState([])
    const handleChangeDepartment = (event) => {
        setSelectedOptionDepartment(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeSemester = (event) => {
        setSelectedOptionSemester(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeYear = (event) => {
        setSelectedOptionYear(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeAcademicYear = (event) => {
        setSelectedOptionAcademicYear(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeSubject = (event) => {
        setSelectedOptionSubject(event.target.value);
        console.log(event.target.value);
    };

    const handleChangeExam = (event) => {
        setSelectedOptionExam(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/', {
                    params: {
                        dep: selectedOptionDepartment,
                        sem: selectedOptionSemester,
                    }
                });
                console.log(response.data);
                setcourseDetail(response.data);
            } catch (err) {
                console.log(err.toString());
            }
        };

        fetchData();
    }, [selectedOptionSemester]);


    const handlesubmit = async (e) => {
        e.preventDefault();

        localStorage.setItem("dept", selectedOptionDepartment)
        localStorage.setItem("year", selectedOptionYear)
        localStorage.setItem("sem", selectedOptionSemester)
        localStorage.setItem("subcode", selectedOptionSubject)



        navigate("/markentry")





    }
    // const gridStyle = { minHeight: 550, marginTop: 10 }
    // const columns = [
    //     { name: 'id', type: 'number', maxWidth: 40, header: 'ID', defaultVisible: false },
    //     { name: 'Student_name', defaultFlex: 2, header: 'Student Name' },
    //     { name: 'Reg_No', defaultFlex: 3, header: 'Register Number' },
    //     { name: 'Year', defaultFlex: 4, header: 'Year' },

    //     { name: 'Department', defaultFlex: 5, header: 'Department' },
    //     { name: "Course_name", defaultFlex: 6, header: "Subject Name" },
    //     { name: "mark", defaultFlex: 7, header: "Mark" },


    // ];





    return (
        <>
            <Box className='home' >

                <Sidebar />

                <Box className='homeContainer'>
                    <Box ml={"4.5rem"}>
                        <Navbar />

                    </Box>
                    <Box className='home-content' mt={150}>


                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} >
                            <Stack spacing={4} width={"50%"}>
                                <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Department :</FormLabel>
                                    <Select
                                        value={selectedOptionDepartment}
                                        onChange={handleChangeDepartment}
                                        placeholder="Select Department"
                                    >

                                        <option value="CSE">Computer Science and Engineering</option>
                                        <option value="Mech">Mechanical Engineering</option>
                                        <option value="EEE">Electrical and Electronics Engineering</option>
                                        <option value="ECE">Electronics and Communication Engineering</option>
                                        <option value="Civil">Civil Engineering</option>

                                    </Select>
                                </FormControl>
                                <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Year :</FormLabel>
                                    <Select
                                        value={selectedOptionYear}
                                        onChange={handleChangeYear}
                                        placeholder="Select Year"
                                    >
                                        <option value="1">First Year</option>
                                        <option value="2">Second Year</option>
                                        <option value="3">Third Year</option>
                                        <option value="4">Final Year</option>



                                    </Select>
                                </FormControl>
                                {/* <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Academic Year :</FormLabel>
                                    <Select
                                        value={selectedOptionAcademicYear}
                                        onChange={handleChangeAcademicYear}
                                        placeholder="Select Academic Year"
                                    >

                                        {years.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                    </Select>
                                </FormControl> */}
                                <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Semester :</FormLabel>
                                    <Select
                                        value={selectedOptionSemester}
                                        onChange={handleChangeSemester}
                                        placeholder="Select Semester"
                                    >
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                        <option value="3">Semester 3</option>
                                        <option value="4">Semester 4</option>
                                        <option value="5">Semester 5</option>
                                        <option value="6">Semester 6</option>
                                        <option value="7">Semester 7</option>
                                        <option value="8">Semester 8</option>


                                    </Select>
                                </FormControl>
                                <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Subject :</FormLabel>
                                    <Select
                                        value={selectedOptionSubject}
                                        onChange={handleChangeSubject}
                                        placeholder="Select Subject"
                                    >
                                        {
                                            courseDetail.map((item) => (

                                                <option key={item.Course_id} value={item.Course_id}>{item.Course_id + "-" + item.Course_name}</option>

                                            ))
                                        }

                                    </Select>
                                </FormControl>
                                <FormControl width={"100%"} id="email" isRequired>
                                    <FormLabel>Select Mark Entry :</FormLabel>
                                    <Select
                                        value={selectedOptionExam}
                                        onChange={handleChangeExam}
                                        placeholder="Select Mark Entry"
                                    >
                                        <option value="Cycle Test 1">Cycle Test 1</option>
                                        <option value="Cycle Test 2">Cycle Test 2</option>
                                        <option value="Model">Model</option>
                                        <option value="University">University</option>
                                        <option value="Assignment1">Assignment 1</option>
                                        <option value="Assignment2">Assignment 2</option>
                                        <option value="Assignment3">Assignment 3</option>
                                        <option value="Assignment4">Assignment 4</option>
                                        <option value="Lab">Lab</option>


                                    </Select>
                                </FormControl>

                                <Box mt={3} width={"100%"}>
                                    <Button onClick={handlesubmit} width={"100%"} colorScheme='twitter'>Submit</Button>
                                </Box>
                            </Stack>
                        </Box>
                        <Divider mt={5} />
                        {/* <Box width={"100%"}>
                            <Box mx={10} p={5}>


                                <TableContainer >
                                    <Table variant='striped' colorScheme='twitter'>
                                        <TableCaption>Student Details</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th className='text-center'>Register Number</Th>
                                                <Th className='text-center'>Student Name</Th>
                                                <Th className='text-center' >Year</Th>
                                                <Th className='text-center'>Department</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody className='text-center'>


                                            {
                                                studentDetails.map((item) => (
                                                    <Tr className='text-center'>
                                                        <Td className='text-center font-semibold' key={item.Reg_No}>{item.Reg_No}</Td>
                                                        <Td className='text-center font-semibold' key={item.Reg_No}>{item.Student_name}</Td>
                                                        <Td className='text-center font-semibold' key={item.Reg_No}>{item.Year}</Td>
                                                        <Td className='text-center font-semibold' key={item.Reg_No}>{item.Department}</Td>
                                                    </Tr>


                                                ))
                                            }



                                        </Tbody>

                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box> */}



                    </Box>

                </Box>
            </Box>


        </>
    )
}

export default HomeScreen