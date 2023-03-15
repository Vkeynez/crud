import react, { useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormHelperText, FormLabel, Paper, Icon, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addUser, editUser, getUsers } from '../Service/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Stack } from '@mui/system';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

let initialValue = {
  employeeName: '',
  employeeId: '',
  Department_Team: '',
  sex: '',
  maritalStatus: '',
  salary: '',
  address: '',
}

const genderOptions = ["Male", "Female", "Prefered not to say"];
const maritalStatus = [{ id: 'single', name: 'single' }, { id: 'married', name: 'married' }, { id: 'widowed', name: 'widowed' }, { id: 'divorced', name: 'divorced' }, { id: 'separated and, in certain cases', name: 'separated and, in certain cases' }, { id: 'registered partnership', name: 'registered partnership' }];


const AddUser = () => {

  const [initialValues, setInitialValues] = useState(initialValue)

  const { id } = useParams();


  useEffect(() => {
    if (id) {
      loadUserDetails();
    } else {
      setInitialValues(initialValue)
    }
  }, [id]);

  const loadUserDetails = async () => {
    try {
      const { data } = await getUsers(id);
      setInitialValues({ ...data.user, ...data.salary })
    } catch (error) {
      navigate('/404')
    }
  }

  let navigate = useNavigate();

  const validationSchema = yup.object({
    employeeName: yup.string()
      .required('Employee Name is required'),
    employeeId: yup.string()
      .required('Employee Id is required'),
    sex: yup.string()
      .required('Gender is required'),
    Department_Team: yup.string()
      .required('Department/Team is required'),
    maritalStatus: yup.string()
      .required('Marital Status is required'),
    salary: yup.number('Enter your Salary')
      .required('Salary is required'),
    address: yup.string().required('address is required'),
  });

  const onSubmit = async (values) => {
    try {

      if (id) {
        await editUser(id, values)
      } else {
        await addUser(values)
      }

      navigate('/all');
    } catch (error) {
      if (error.response.status === 401) {
        formik.setFieldError('employeeId', error.response.data.message)
        return alert(error.response.data.message)
      }
      console.log(error.response, error.message, error.status, 'E11000')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true
  });


  return (
    <Container sx={{ mt: 10 }} >
      <Typography variant="h4" textAlign={'center'}>User Detail</Typography>
      <Paper variant='elevation' elevation={24} sx={{ p: 5, m: 'auto', width: 'fit-content', alignItems: 'center', justifyContent: 'center' }} >
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
          <Stack spacing={3} marginRight={5} width='50%'>

            <TextField
              margin='dense'
              id="employeeName"
              name="employeeName"
              label="Employee Name"
              type='text'
              value={formik.values?.employeeName}
              onChange={formik.handleChange}
              error={formik.touched?.employeeName && Boolean(formik.errors?.employeeName)}
              helperText={formik.touched?.employeeName && formik.errors?.employeeName}
            />
            <TextField
              margin='dense'
              id="employeeId"
              name="employeeId"
              label="Employee Id"
              type="text"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
              helperText={formik.touched.employeeId && formik.errors.employeeId}
            />
            <TextField
              margin='dense'
              id="Department_Team"
              name="Department_Team"
              label="Department/Team"
              type="text"
              value={formik.values.Department_Team}
              onChange={formik.handleChange}
              error={formik.touched.Department_Team && Boolean(formik.errors.Department_Team)}
              helperText={formik.touched.Department_Team && formik.errors.Department_Team}
            />
            <FormControl error={formik.touched.sex && Boolean(formik.errors.sex)}>

              <FormLabel id="gender-radio">Sex</FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio"
                name="sex"
                row
                value={formik.values.sex}
                onChange={formik.handleChange}
              >
                {genderOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <FormHelperText error={formik.touched.sex && Boolean(formik.errors.sex)} >{formik.touched.sex && formik.errors.sex}</FormHelperText>

            </FormControl>
          </Stack>
          <Stack spacing={3} width='50%'>
            <TextField
              margin='dense'
              variant="outlined"
              name="maritalStatus"
              id="maritalStatus"
              select
              label="Marital Status"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              error={
                formik.touched.maritalStatus &&
                Boolean(formik.errors.maritalStatus)
              }
              helperText={
                formik.touched.maritalStatus && formik.errors.maritalStatus
              }
            >
              <MenuItem key={""} value={""}>
                Select
              </MenuItem>
              {maritalStatus.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin='dense'
              id="salary"
              name="salary"
              label="Salary"
              type="number"
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <TextField
              margin='dense'
              id="address"
              name="address"
              label="Address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <Stack spacing={2} justifyContent='space-between' direction={{ xs: 'column', md: 'row' }}>

              <Button color={'error'} sx={{ textTransform: 'none' }} variant="outlined" type="reset" onClick={() => {
                setInitialValues(initialValue)
                formik.resetForm()
              }} >
                Clear
                <RestartAltIcon sx={{ marginLeft: 1 }} />
              </Button>

              <Button color={'inherit'} sx={{ textTransform: 'none' }} variant="outlined" LinkComponent={Link} to='/all'>
                View
                <ListAltIcon sx={{ marginLeft: 1 }} />
              </Button>

            </Stack>
            <Button color={id ? 'success' : "primary"} variant="contained" fullWidth type="submit">
              {id ? 'Update' : 'Submit'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

export default AddUser;