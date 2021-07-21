import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/navbar";

import { updateClient, getClient } from "../../store/client/actions";

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
    client,
    loading,
    success,
    errorMessage
  ] = useSelector((state) => [
    state.client.client,
    state.client.loading,
    state.client.successUpdate,
    state.client.error.message,
  ]);

  const onSubmit = (_data) => {
    const data = {
      ..._data,
      id: params.id 
    }
    try {
      dispatch(updateClient(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    if (success) {
      history.push("/clients");
    }
  }, [success, history]);

  const name = register('name', { required: true });
  const email = register('email', { required: true });

  useEffect( () => {
    if (client) {
      setValue("name", client.name);
      setValue("email", client.email);
    }
  }, [client, setValue]);

  useEffect(() => {
    dispatch(getClient(params.id));
  }, [dispatch, params.id]);
  
  return (
    <Container component="main">
      <Navbar />
      <Typography className={classes.title} variant="h3">Client</Typography>
      <Grid className={classes.paper} >
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"  
            name="name"
            label="Name"
            autoComplete="name"
            inputProps={{...name}}
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
                onClick={() => history.push(`/clients/`)}
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
