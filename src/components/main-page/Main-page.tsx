import {Button, Card, CardMedia, createStyles, Grid, makeStyles, Paper, TextField, Theme} from '@material-ui/core'
import React, {ChangeEvent, useState} from 'react'
import {grey} from "@material-ui/core/colors";
import {NavLink, Route, Switch, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../sever-api/api";
import {UsersTable} from "../users-table/UsersTable";
import {UsersView, UsersViewElement} from "../users-view/UsersView";
import Grow from "@material-ui/core/Grow";


export const MainPage = () => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                margin: '0 auto',
                [theme.breakpoints.down('xl')]: {
                    width: '80%'
                },
                [theme.breakpoints.down('lg')]: {
                    width: '80%'
                },
                [theme.breakpoints.down('md')]: {
                    width: '80%'
                },
                [theme.breakpoints.down('sm')]: {
                    width: '95%'
                },
                [theme.breakpoints.down('xs')]: {
                    width: '95%'
                },
                search: {
                    width: '100%',
                }
            },
            search: {
                width: '100%',

            },
            paper: {
                background: grey[900],
                padding: 10
            }

        }),
    );

    const classes = useStyles()

    const [searchValue, setSearchValue] = useState('')
    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setSearchValue(e.currentTarget.value)
    }

    const usersData = useSelector<AppStateType, UserType[]>(state => state.reducer.usersData)

    return (
        <>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <Grow in={true}>
                        <Paper className={classes.paper}>
                            <TextField value={searchValue}
                                       onChange={searchOnChangeHandler}
                                       label={'Search'}
                                       className={classes.search}
                                       color={'secondary'}/>
                        </Paper>
                    </Grow>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div>
                            <NavLink to={`/table-data/sort-by-id`}>
                                <Button variant="contained" color="secondary">
                                    By id
                                </Button>
                            </NavLink>
                            <NavLink to={`/table-data/sort-by-name`}>
                                <Button variant="contained" color="secondary">
                                    By nam`
                                </Button>
                            </NavLink>
                            <NavLink to={`/table-data/sort-by-age`}>
                                <Button variant="contained" color="secondary">
                                    By age
                                </Button>
                            </NavLink>
                        </div>
                        <div>
                            <Switch>
                                <Route exact path={`/table-data`} render={() => <div>Please Select type of sorting</div>}/>
                                <Route path={`/table-data/sort-by-id`} render={() => {

                                    return (
                                        <div>
                                            <NavLink to={`/table-data/sort-by-id/asc`}>
                                                <Button variant="contained" color="secondary">
                                                    ASC
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/table-data/sort-by-id/des`}>
                                                <Button variant="contained" color="secondary">
                                                   DES
                                                </Button>
                                            </NavLink>
                                        </div>
                                    )
                                }}/>
                                <Route path={`/table-data/sort-by-name`} render={() => {
                                    return (
                                        <div>
                                            <NavLink to={`/table-data/sort-by-name/asc`}>
                                                <Button variant="contained" color="secondary">
                                                    ASC
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/table-data/sort-by-name/des`}>
                                                <Button variant="contained" color="secondary">
                                                    DES
                                                </Button>
                                            </NavLink>
                                        </div>
                                    )
                                }}/>
                                <Route path={`/table-data/sort-by-age`} render={() => {
                                    return (
                                        <div>
                                            <NavLink to={`/table-data/sort-by-age/asc`}>
                                                <Button variant="contained" color="secondary">
                                                    ASC
                                                </Button>
                                            </NavLink>
                                            <NavLink to={`/table-data/sort-by-age/des`}>
                                                <Button variant="contained" color="secondary">
                                                    DES
                                                </Button>
                                            </NavLink>
                                        </div>
                                    )
                                }}/>
                            </Switch>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <NavLink to={`/table-data/table`}>
                            <Button variant="contained" color="secondary">
                                Table
                            </Button>
                        </NavLink>
                        <NavLink to={`/table-data/preview`}>
                            <Button variant="contained" color="secondary">
                                Preview
                            </Button>
                        </NavLink>
                    </Paper>
                </Grid>*/}
                <Grid item xs={12}>

                    {/* <UsersTable data={usersData}/>*/}
                    <UsersView data={usersData}/>
                </Grid>
            </Grid>
        </>
    )
}