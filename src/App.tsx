import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {createMuiTheme, Paper, ThemeProvider} from "@material-ui/core";
import {grey, indigo} from "@material-ui/core/colors";
import {NavLink, Redirect, Route} from 'react-router-dom';
import {MainPage} from "./components/main-page/Main-page";
import {useDispatch, useSelector} from "react-redux";
import {getDataTC} from "./redux/reducer";
import {AppStateType} from "./redux/store";
import {UserType} from "./sever-api/api";


function App() {

    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                dark: grey[900],
                light: indigo[500],
                main: grey[900],
            },
            secondary: {
                dark: indigo[500],
                light: indigo[500],
                main: indigo[100],
            }
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataTC())
    }, [])



    const [searchValue, setSearchValue] = useState('aaa')
    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setSearchValue(e.currentTarget.value)
    }


    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square style={{minHeight: '100vh', padding: '30px 0 30px 0'}}>
                <div>

                    <Route exact path='/' ><Redirect to={'/table-data'}/></Route>
                    <Route path={'/table-data'} render={() => <MainPage/>}/>
                </div>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
