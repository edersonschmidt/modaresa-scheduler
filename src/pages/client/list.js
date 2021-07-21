import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Navbar from "../../components/navbar";

import { getClients, removeClient } from "../../store/client/actions";


import {
  Container,
  LinearProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button,
  TableCell,
  Table,
  TableRow,
  TableBody,
  TableHead,
  Typography,
  Grid,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";

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
  error: {
    color: "#F00",
  },
}));

const ListPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [openRemove, setOpenRemove] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  const [
    list,
    loading,
    successDelete,
    errorMessage
  ] = useSelector((state) => [
    state.client.list,
    state.client.loading,
    state.client.successDelete,
    state.client.error.message,
  ]);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const openRemoveDialog = (item) => {
    setItemSelected(item);
    setOpenRemove(true);
  }

  const handleRemove = () => {
    setOpenRemove(false);
    try {
      dispatch(removeClient(itemSelected));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (successDelete){
      dispatch(getClients());
    }
  }, [dispatch, successDelete]);

  const ClientRow = ({item}) => {
    return (
      <TableRow>
        <TableCell component="th" scope="row">{item.id}</TableCell>
        <TableCell align="right">{item.name}</TableCell>
        <TableCell align="right">{item.email}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" onClick={() => history.push(`/clients/${item.id}`)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" onClick={() => openRemoveDialog(item)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
  
  return (
    <Container component="main">
      <Navbar />
      <Typography className={classes.title} variant="h3">Clients</Typography>
      <Grid className={classes.paper} >
        {loading && (
          <Box>
            <LinearProgress />
          </Box>
        )}
        {errorMessage && (
          <Box className={classes.error}>{errorMessage}</Box>
        )}
        {list && list.length > 0 && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => (
                <ClientRow key={`client_#${index}`} item={item} />
              ))}
            </TableBody>
          </Table>
        )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/clients/create")
          }}
          disabled={loading}
        >
          New Client
        </Button>
      </Grid>
      <Dialog
        open={openRemove}
        onClose={() => setOpenRemove(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemove(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            REMOVE
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListPage;
