import React, {useEffect} from 'react';
import './App.css';
import {createMuiTheme, Paper, ThemeProvider} from "@material-ui/core";
import {blue, grey, indigo} from "@material-ui/core/colors";
import {Redirect, Route} from 'react-router-dom';
import {MainPage} from "./components/main-page/Main-page";
import {useDispatch} from "react-redux";
import {getDataTC, getFavoritesTC} from "./redux/reducer";


function App() {

    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                dark: grey[900],
                light: indigo[500],
                main: grey[500],
            },
            secondary: {
                dark: indigo[500],
                light: indigo[500],
                main: blue[500],
            }
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataTC())
        dispatch(getFavoritesTC())
    }, [dispatch])


    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square style={{minHeight: '100vh', padding: '30px 0 30px 0'}}>
                <div>
                    <Route exact path='/' ><Redirect to={'/table-data'}/></Route>
                    <Route path={'/table-data'} render={() => <MainPage />}/>
                </div>
            </Paper>
        </ThemeProvider>
    );
}

export default App;
