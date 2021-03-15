import {Button, ButtonGroup, createStyles, Grid, makeStyles, Paper, TextField, Theme} from '@material-ui/core'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {blue, grey} from "@material-ui/core/colors";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {UserType} from "../../sever-api/api";
import Grow from "@material-ui/core/Grow";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FaceIcon from '@material-ui/icons/Face';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import TocIcon from '@material-ui/icons/Toc';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {setLanguage, setOrder, setSearch, setTypeOfSorting, setView} from "../../redux/reducer";
import {FilterType, sortedUsersHandle} from "../../utils/utils";
import {UsersView} from '../users-view/UsersView';
import {UsersTable} from "../users-table/UsersTable";


export const MainPage = () => {

    const [isFirstRendering, setFirstRendering] = useState(true)

    const {view, order, typeOfSorting, search, lang, languagePackage} = useSelector<AppStateType, any>(state => state.reducer)

    const usersData = useSelector<AppStateType, UserType[]>(state => state.reducer.usersData)

    const filter: FilterType = {
        search,
        field: typeOfSorting,
        order
    }

    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.currentTarget.value))
    }

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
                padding: 10,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paperSearch: {
                background: grey[900],
                padding: 10,
                textAlign: 'right',

            },
            sortBy: {
                '&:hover': {
                    color: blue[500],
                },
            },
            selected: {
                color: blue[500],
                backgroundColor: grey[900]
            }
        }),
    );

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFirstRendering) {
            const urlData: { [key: string]: string } = {}

            new URLSearchParams(history.location.search).forEach((value, key) => {
                urlData[key] = value
            })

            if (urlData.view) {
                dispatch(setView(urlData.view))
            }
            if (urlData.order) {
                dispatch(setOrder(urlData.order))
            }
            if (urlData.typeOfSorting) {
                dispatch(setTypeOfSorting(urlData.typeOfSorting))
            }
            if (urlData.search) {
                dispatch(setSearch(urlData.search))
            }
            if (urlData.lang) {
                dispatch(setLanguage(urlData.lang))
            }
            setFirstRendering(false)
        }


    }, [view, order, typeOfSorting, search, lang, dispatch, history.location.search, isFirstRendering])

    useEffect(() => {

        if (!isFirstRendering) {

            const searchObj: { [key: string]: string } = {}

            if (view) searchObj.view = view
            if (order) searchObj.order = order
            if (typeOfSorting) searchObj.typeOfSorting = typeOfSorting
            if (search) searchObj.search = search
            if (lang) searchObj.lang = lang

            const queryObj = new URLSearchParams(searchObj)

            history.push({
                search: queryObj.toString(),
            })
        }
    }, [view, order, typeOfSorting, search, lang, dispatch, history, isFirstRendering])



    return (
        <>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <Grow in={true}>
                        <Paper className={classes.paperSearch}>
                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                <Button className={lang === 'ru' ? classes.selected : ''}
                                        onClick={() => dispatch(setLanguage('ru'))}>ru</Button>

                                <Button className={lang === 'en' ? classes.selected : ''}
                                        onClick={() => dispatch(setLanguage('en'))}>eng</Button>
                            </ButtonGroup>

                            <TextField value={search}
                                       onChange={searchOnChangeHandler}
                                       label={languagePackage[lang].search}
                                       className={classes.search}
                                       color={'secondary'}/>

                        </Paper>
                    </Grow>
                </Grid>
                <Grow in={true}>
                    <Grid item xs={12} lg={6}>
                        <Paper className={classes.paper}>
                            <div style={{width: '100%'}}>
                                <ButtonGroup variant="contained"
                                             color="primary"
                                             aria-label="contained primary button group"
                                             size={"small"}>

                                    <Button className={(typeOfSorting === 'id') ? `${classes.sortBy} ${classes.selected}` : classes.sortBy}
                                            startIcon={<FingerprintIcon/>}
                                            onClick={() => dispatch(setTypeOfSorting('id'))}
                                    >
                                        {languagePackage[lang].byId}
                                    </Button>

                                    <Button className={(typeOfSorting === 'name') ? `${classes.sortBy} ${classes.selected}` : classes.sortBy}
                                            startIcon={<FaceIcon/>}
                                            onClick={() => dispatch(setTypeOfSorting('name'))}
                                    >

                                        {languagePackage[lang].byName}
                                    </Button>

                                    <Button className={(typeOfSorting === 'age') ? `${classes.sortBy} ${classes.selected}` : classes.sortBy}
                                            startIcon={<DirectionsWalkIcon/>}
                                            onClick={() => dispatch(setTypeOfSorting('age'))}
                                    >

                                        {languagePackage[lang].byAge}
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <div>
                                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                    <Button className={order === 'asc' ? classes.selected : ''}
                                            onClick={() => dispatch(setOrder('asc'))}
                                    >
                                        {languagePackage[lang].asc}
                                    </Button>
                                    <Button className={order === 'des' ? classes.selected : ''}
                                            onClick={() => dispatch(setOrder('des'))}>
                                        {languagePackage[lang].des}
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Paper>
                    </Grid>
                </Grow>
                <Grow in={true}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <ButtonGroup variant="contained" color="primary"
                                         aria-label="contained primary button group"
                                         size={"large"}>
                                <Button onClick={() => dispatch(setView('table'))}
                                        className={`${classes.sortBy} ${view === 'table' && classes.selected}`}
                                        startIcon={<TocIcon/>}>{languagePackage[lang].table}</Button>

                                <Button onClick={() => dispatch(setView('preview'))}
                                        className={`${classes.sortBy} ${view === 'preview' && classes.selected}`}
                                        startIcon={<ViewModuleIcon/>}>{languagePackage[lang].preview}</Button>

                            </ButtonGroup>

                        </Paper>
                    </Grid>
                </Grow>
                <Grid item xs={12}>
                    {
                        view === 'table'
                            ?  <UsersTable data={sortedUsersHandle(filter, usersData)}/>
                            :  <UsersView data={sortedUsersHandle(filter, usersData)}/>
                    }
                </Grid>
            </Grid>
        </>
    )
}


