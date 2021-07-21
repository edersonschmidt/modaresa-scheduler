import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { DateTime } from "luxon"
import { toNumber, find } from 'lodash'

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  removeAppointment
} from "../../store/appointment/actions"

import { getStaffs } from "../../store/staff/actions"
import { getClients } from "../../store/client/actions"

import {
  Button,
  Container,
  InputLabel,
  Input,
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  LinearProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup
  } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
} from '@syncfusion/ej2-react-schedule';

import Navbar from "../../components/navbar";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentData: {
    marginTop: 12,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  error: {
    color: "#F00",
  },
}));

const SchedulerPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();

  const [scheduleComp, setScheduleComp] = useState(null);

  const [openEventDlg, setOpenEventDlg] = useState(false);
  const [openRemoveDlg, setOpenRemoveDlg] = useState(false);
  
  const [formBasicData, setFormBasicData] = useState({
    id: null,
    startTime: null,
    endTime: null
 });

  const clientId = register('clientId', { required: true });
  const staffId = register('staffId', { required: true });
  const subject = register('subject', { required: true });
  const description = register('description', { required: false });

  const [
    list,
    listStaffs,
    listClients,
    loading,
    successCreate,
    successUpdate,
    successDelete,
    errorMessage
  ] = useSelector((state) => [
    state.appointment.list,
    state.staff.list,
    state.client.list,
    state.appointment.loading,
    state.appointment.successCreate,
    state.appointment.successUpdate,
    state.appointment.successDelete,
    state.appointment.error.message,
  ]);

  useEffect(() => {
    dispatch(getAppointments());
    dispatch(getClients());
    dispatch(getStaffs());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate === true || 
      successUpdate === true || 
      successDelete === true){
        dispatch(getAppointments());
        if (openEventDlg){
          setOpenEventDlg(false);
          if (openRemoveDlg) { setOpenRemoveDlg(false) }
        }
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  const getEventList = () => {
    if (list) {
      return list.map((item, index) => (
        {
          Id: item.id,
          Subject: item.subject,
          StartTime: DateTime.fromMillis(toNumber(item.startTime)).toJSDate(),
          EndTime: DateTime.fromMillis(toNumber(item.endTime)).toJSDate(),
          Description: item.description
        }
      ));
    }
    return [];
  }

  const getEventById = (id) => {
    if (list) {
      return find(list, {id});
    }
    return null;
  }

  const onSubmit = (_data) => {
    try {
      const data = {
        ..._data,
        ...formBasicData
      };
      const {id} = data;
      if (!id) {
        dispatch(createAppointment(data));
      } else {
        dispatch(updateAppointment(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = (e) => {
    try {
      const data = {
        ...formBasicData
      };
      const {id} = data;
      if (id) {
        dispatch(removeAppointment(data));
      } else {
        throw 'parameter id is missing';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEvent = ({Id}) => {
    resetForm();

    const event = getEventById(Id);

    if (!event) { return; };

    setFormBasicData(prevValues => {
      return {
        ...prevValues,
        id: Id,
        startTime: DateTime.fromMillis(toNumber(event.startTime)),
        endTime: DateTime.fromMillis(toNumber(event.endTime)),
      };
    });

    setValue("clientId", event.clientId);
    setValue("staffId", event.staffId);
    setValue("subject", event.subject);
    setValue("description", event.description);

    setOpenEventDlg(true);
  }

  const openNewEvent = ({startTime, endTime}) => {
    resetForm();

    setFormBasicData(prevValues => {
      return {
        ...prevValues,
        startTime: DateTime.fromJSDate(startTime),
        endTime: DateTime.fromJSDate(endTime),
      };
    });

    setOpenEventDlg(true);
  }

  const resetForm = () => {
    setFormBasicData(prevValues => {
      return {
        ...prevValues,
        id: null,
        startTime: null,
        endTime: null,
      };
    });

    reset({
      clientId: null,
      staffId: null,
      subject: '',
      description: '',
    });
  }

  return (
    <Container component="main">
      <Navbar />
      {loading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      {errorMessage && (
        <Box className={classes.error}>{errorMessage}</Box>
      )}
      <ScheduleComponent
        height="650px"
        currentView='Month'
        ref={(schedule) => {
          setScheduleComp(schedule);
        }}
        actionBegin={(args) => {
          const {requestType} = args;
          switch (requestType) {
              case 'eventCreate':
                createEvent(args);
                break;
              case 'eventChange':
                break;
              case 'eventRemove':
                break;
              default:
                break;
          }
        }}
        eventSettings={{
          dataSource: getEventList()
        }}
        showQuickInfo={false}
        eventClick={({event}) => {
          openEvent(event);
        }}
        cellDoubleClick={(e) => {
          openNewEvent(e);
        }}
        popupOpen={(e) => e.cancel = true} >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>

      <Dialog
        open={openEventDlg}
        onClose={(e, reason) => {
          if (reason === `backdropClick`) return;
          setOpenEventDlg(false);
        }}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {formBasicData.id && (
            <>
              Event Details
              <Typography variant="body2">
                {formBasicData.startTime.toLocaleString(DateTime.DATETIME_MED)} - {formBasicData.endTime.toLocaleString(DateTime.DATETIME_MED)}
              </Typography>
            </>
          )}
          {!formBasicData.id && formBasicData.startTime && formBasicData.endTime && (
            <>
              New Event
              <Typography variant="body2">
                {formBasicData.startTime.toLocaleString(DateTime.DATETIME_MED)} - {formBasicData.endTime.toLocaleString(DateTime.DATETIME_MED)}
              </Typography>
            </>
          )}
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <FormControl fullWidth>
                <InputLabel id="clientLabel">Client</InputLabel>
                <Select
                  defaultValue=""
                  labelId="clientLabel"
                  id="clientId"
                  name="clientId"
                  inputProps={{...clientId}}
                  input={<Input label="Client" />}
                >
                  {!listClients && (<MenuItem key={'empty'} value="">There isnt any client registered</MenuItem>)}
                  {listClients && listClients.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            
              <FormControl fullWidth>
                <InputLabel id="staffLabel">Staff</InputLabel>
                <Select
                  fullWidth
                  defaultValue=""
                  labelId="staffLabel"
                  id="staffId"
                  name="staffId"
                  inputProps={{...staffId}}
                  input={<Input label="Staff" />}
                >
                  {!listStaffs && (<MenuItem key={'empty'} value="">There isnt any client registered</MenuItem>)}
                  {listStaffs && listStaffs.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.firstname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                margin="dense"
                id="subject"  
                name="subject"
                label="Subject"
                autoComplete="subject"
                inputProps={{...subject}}
              />

              <TextField
                fullWidth
                margin="dense"
                id="description"  
                name="description"
                label="Description"
                multiline
                maxRows={3}
                inputProps={{...description}}
              />
              <div style={{ marginTop: 12 }}>
                <Box display="flex" fullWidth justifyContent="space-between">
                  <Button
                    type="button"
                    onClick={() => setOpenEventDlg(false)}
                    color="primary">
                    Cancel
                  </Button>
                  {!formBasicData.id && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary">
                        Create
                    </Button>
                  )}
                  {formBasicData.id && (
                    <>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => setOpenRemoveDlg(true)}
                        color="primary">
                          Remove
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                          Update
                      </Button>
                    </>
                  )}
                </Box>
              </div>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openRemoveDlg}
        onClose={() => setOpenRemoveDlg(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveDlg(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            REMOVE
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SchedulerPage;
