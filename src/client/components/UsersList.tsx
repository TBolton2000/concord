import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { IUserDTO } from '../../shared/IUserDTO';
import { User } from './User';
import { useUsersQuery } from '../generated/graphql';

export const UsersList: React.FC = () => {
    const {data, loading} = useUsersQuery();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
      <>
        <Grid item xs={12}>
            <Card>
                <CardHeader title='Users List' />
                <CardContent>
                <List>
                    {data.users.length ?
                    data.users.map(user => (
                    <ListItem key={user.id}>
                        <NavLink to={`/users-list/${user.id}`}>{user.name}, {user.email}</NavLink>
                    </ListItem>
                    ))
                    : "No users"}
                </List>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={12}>
          <Route
            exact
            path='/users-list/:userId'
            render={props => <User user={data.users.find(user => user.id === parseInt(props.match.params.userId))} />}
          />
        </Grid>
      </>
    );
}
