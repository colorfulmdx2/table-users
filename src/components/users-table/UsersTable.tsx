import React from "react";
import {UserType} from "../../sever-api/api";
import {Avatar, createStyles, Grid, makeStyles, Paper, Theme} from "@material-ui/core";
import {grey, yellow} from "@material-ui/core/colors";
import StarIcon from '@material-ui/icons/Star';
// @ts-ignore
import cat from '../../assets/images/cat.svg'
import dog from '../../assets/images/dog.svg'
import fox from '../../assets/images/fox.svg'
import koala from '../../assets/images/koala.svg'
import lion from '../../assets/images/lion.svg'
import owl from '../../assets/images/owl.svg'
import penguin from '../../assets/images/penguin.svg'
import pig from '../../assets/images/pig.svg'
import raccoon from '../../assets/images/raccoon.svg'
import react from '../../assets/images/react.svg'
import sheep from '../../assets/images/sheep.svg'
import Zoom from '@material-ui/core/Zoom';
import FadeIn from 'react-fade-in';
import ScrollAnimation from 'react-animate-on-scroll';


export let imagesObj: any = {
    cat,
    dog,
    fox,
    koala,
    lion,
    owl,
    penguin,
    pig,
    raccoon,
    react,
    sheep
}


type UsersTablePropsType = {
    data: UserType[]
}

export const UsersTable = (props: UsersTablePropsType) => {

    const users = props.data.slice(0, 20).map((e) => {
        return (
           /* <ScrollAnimation animateIn="fadeIn">*/
                <UsersTableElement key={e.id}
                                   id={e.id}
                                   name={e.name}
                                   age={e.age}
                                   favourite={e.favourite}
                                   image={imagesObj[e.image]}
                                   phone={e.phone}
                                   phrase={e.phrase}
                                   video={e.video}
                />
           /* </ScrollAnimation>*/
        )
    })

    return (
        <>

            <FadeIn>
                {users}
            </FadeIn>

        </>
    )
}


export const UsersTableElement = (props: UserType) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                boxSizing: 'border-box',
                background: grey[900],
                padding: 10,
                margin: '10px 0 10px 0'
            },
            cell: {
                textAlign: 'center'
            }

        }),
    )
    const classes = useStyles();
    return (


        <Paper className={classes.paper}>
            <Grid container
                  xl={12}
                  justify="center"
                  alignItems="center"
            >
                <Grid className={classes.cell} item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Avatar alt="Remy Sharp" src={props.image}/>
                </Grid>
                <Grid className={classes.cell} item xs={3} sm={4} md={4} lg={4} xl={4}>
                    {props.name}
                </Grid>
                <Grid className={classes.cell} item xs={3} sm={3} md={2} lg={2} xl={2}>
                    {`${props.age} years old`}
                </Grid>
                <Grid className={classes.cell} item xs={4} sm={3} md={4} lg={4} xl={4}>
                    {props.phone}
                </Grid>
                <Grid className={classes.cell} item xs={1} sm={1} md={1} lg={1} xl={1}>
                    <StarIcon fontSize={"large"} style={{color: yellow[500]}}/>
                </Grid>
            </Grid>
        </Paper>

    )
}