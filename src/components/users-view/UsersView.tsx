import React from "react";
import {UserType} from "../../sever-api/api";
import {Avatar, Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
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
import {grey, yellow} from "@material-ui/core/colors";
import StarIcon from "@material-ui/icons/Star";
// @ts-ignore
import boy from '../../assets/videos/boy.mp4'
// @ts-ignore
import shoe from '../../assets/videos/shoe.mp4'
import FadeIn from 'react-fade-in';
// @ts-ignore
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

export let videoObj: any = {
    boy,
    shoe
}

type UsersTablePropsType = {
    data: UserType[]
}

export const UsersView = (props: UsersTablePropsType) => {


    const users = props.data.slice(0, 20).map((e) => {
        return (

            <UsersViewElement key={e.id}
                              id={e.id}
                              name={e.name}
                              age={e.age}
                              favourite={e.favourite}
                              image={imagesObj[e.image]}
                              phone={e.phone}
                              phrase={e.phrase}
                              video={e.video ? videoObj[e.video] : false}
            />


        )
    })

    return (


        <Grid container
              spacing={6}
              justify="center"
              alignItems="center">
            {users}
        </Grid>


    )
}

export const UsersViewElement = (props: UserType) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            card: {
                width: '100%',
                height: 400,
                background: grey[900]

            },
            avatar: {
                width: theme.spacing(15),
                height: theme.spacing(15),
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(7),
                    height: theme.spacing(7),
                },

            },
            name: {
                [theme.breakpoints.up('lg')]: {
                    fontSize: 35
                },
            },
            video: {}


        }),
    )
    const classes = useStyles();


    if (props.video) {
        return (

            <Grid item xs={12} sm={6} md={6}>
                <ScrollAnimation  animateOnce animateIn="fadeIn">
                    <FadeIn>
                        <Card className={classes.card}>
                            <video className={classes.video} autoPlay={false} loop muted src={props.video}/>
                        </Card>
                    </FadeIn>
                </ScrollAnimation>
            </Grid>

        )
    } else {
        return (

            <Grid item xs={12} sm={6} md={6}>
                <ScrollAnimation  animateOnce animateIn="fadeIn">
                    <FadeIn>
                        <Card className={classes.card}>
                            <CardContent style={{height: '100%'}}>
                                <Grid container
                                      justify={"space-between"}
                                      style={{height: '100%'}}>
                                    <Grid item
                                          container
                                          justify={"space-between"}
                                          alignContent={"center"}
                                          alignItems={"center"}>
                                        <Grid item>
                                            <Avatar className={classes.avatar} alt="Remy Sharp" src={props.image}/>
                                        </Grid>
                                        <Grid item style={{textAlign: 'center'}}>
                                            <Typography className={classes.name} variant="h5" component="h2">
                                                {props.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <StarIcon fontSize={"large"} style={{color: yellow[500]}}/>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h2">
                                            {`${props.age} years old`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h2">
                                            {props.phone}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h2">
                                            {props.phrase}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </ScrollAnimation>
            </Grid>

        )
    }

}