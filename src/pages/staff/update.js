import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/navbar";

import { updateStaff, getStaff } from "../../store/staff/actions";

import {
  Container,
  TextField,
  Button,
  Box,
  LinearProgress,
  Grid,
  Typography,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  error: {
    color: "#F00",
  },
}));

const UpdatePage = ({match: {params}}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, setValue } = useForm();
  
  const [
    staff,
    loading,
    success,
    errorMessage
  ] = useSelector((state) => [
    state.staff.staff,
    state.staff.loading,
    state.staff.successUpdate,
    state.staff.error.message,
  ]);

  const onSubmit = (_data) => {
    const data = {
      ..._data,
      id: params.id 
    }
    try {
      dispatch(updateStaff(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    if (success) {
      history.push("/staffs");
    }
  }, [success, history]);

  const firstname = register('firstname', { required: true });
  const lastname = register('lastname', { required: true });
  const email = register('email', { required: true });

  useEffect( () => {
    if (staff) {
      setValue("firstname", staff.firstname);
      setValue("lastname", staff.lastname);
      setValue("email", staff.email);
    }
  }, [staff, setValue]);

  useEffect(() => {
    dispatch(getStaff(params.id));
  }, [dispatch, params.id]);
  
  return (
    <Container component="main">
      <Navbar />
      <Typography className={classes.title} variant="h3">Staffs</Typography>
      <Grid className={classes.paper} >
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstname"  
            name="firstname"
            label="First Name"
            autoComplete="firstname"
            inputProps={{...firstname}}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"  
            name="lastname"
            label="Last Name"
            autoComplete="lastname"
            inputProps={{...lastname}}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"  
            name="email"
            label="Email"
            autoComplete="email"
            inputProps={{...email}}
          />

          {loading && (
            <Box>
              <LinearProgress />
            </Box>
          )}

          {errorMessage && (
            <Box className={classes.error}>{errorMessage}</Box>
          )}

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push(`/staffs/`)}
                >
                  Back
                </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                >
                  Update
                </Button>
            </Grid>
          </Grid>

        </form>
      </Grid>
    </Container>
  );
};

export default UpdatePage;
