import React, { useState, FunctionComponent } from 'react';
import ReactGA from 'react-ga';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { Redirect  } from 'react-router';
import { Link as RouterLink } from "react-router-dom";
import { LoginComponent as LoginMutationComponent } from "../data/types";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';

type Props = {
}

interface State {
  username: string;
  password: string;
}

export const Login: FunctionComponent<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = React.useState<State>({
    username: '',
    password: '',
  });

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const displayError = (e: ApolloError) => {
    enqueueSnackbar('login error: ' + e.message, { variant: 'error'});
  }

  return <LoginMutationComponent onError={displayError}>
    {(mutate, { loading, data }) => {

      if(data && data.login && data.login.token) {
        localStorage.setItem("token", data.login.token)
        ReactGA.set({ username: values.username });
        return <Redirect to="/" />
      }

      return <Container maxWidth="sm">
    <Card>
      <CardHeader title="Sign in">
      </CardHeader>
    <CardContent>
      <Grid container spacing={2}>
      <form>
        <Grid item xs={12}> 
        <TextField
          id="username"
          label="username"
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
        />
        </Grid>
        <Grid item xs={12}> 
          <TextField
          id="password"
          label="password"
          type="password"
          margin="normal"
      value={values.password}
      onChange={handleChange('password')}
        />
        </Grid>
        <Grid item xs={12}> 
        <Button type="submit" onClick={(e) => { e.preventDefault(); mutate({variables: values})}}>Login</Button> 
        </Grid>
      </form>
      </Grid>
    </CardContent>
  </Card>
    </Container>
    }}</LoginMutationComponent>
}
