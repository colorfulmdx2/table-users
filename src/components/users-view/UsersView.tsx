import React, {useEffect, useRef} from "react";
import {UserType} from "../../sever-api/api";
import {
    Avatar,
    Card,
    CardContent,
    createStyles,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
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
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {addToFavorites, removeFromFavorites} from "../../redux/reducer";
import {saveState} from "../../local-storage/local-storage";
import {ageMaker} from "../../utils/utils";


const imagesObj: any = {
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

export const UsersView = React.memo((props: UsersTablePropsType) => {

    const favorites = useSelector<AppStateType, UserType[]>(state => state.reducer.favorites)

    const [isTouched, setIsTouched] = React.useState<any>(false)

    const isTouchedHandler = () => {
        setIsTouched(true)
    }

    const users = props.data.slice(0, 30).map((e) => {

        let isFavorite = favorites && favorites.find((el) => el.id === e.id)

        if (e.video) {
            return (
                <VideoComponent key={e.id}
                                id={e.id}
                                name={e.name}
                                age={e.age}
                                favourite={e.favourite}
                                image={imagesObj[e.image]}
                                phone={e.phone}
                                phrase={e.phrase}
                                video={e.video ? videoObj[e.video] : false}
                                isFavorite={!!isFavorite}
                                user={e}
                                isTouched={isTouched}
                                isTouchedHandler={isTouchedHandler}
                />
            )

        } else {
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
                                  isFavorite={!!isFavorite}
                                  user={e}
                />
            )
        }

    })

    return (
        <Grid container
              spacing={6}
              justify="center"
              alignItems="center">
            {users}
        </Grid>
    )
})

export const VideoComponent = React.memo((props: UserType) => {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            card: {
                width: '100%',
                height: 400,
                background: grey[900]
            },
            video: {
                height: '100%',
                width: '100%',
            }
        }),
    )

    const classes = useStyles()

    let ref = useRef<any>()

    const [coords, setCoords] = React.useState<any>({})


    useEffect(() => {
        if (props.isTouched !== true) {
            const scrollListener = () => {
                let coords = ref.current && ref.current.getBoundingClientRect()
                setCoords(coords)
            }
            window.addEventListener('scroll', scrollListener)
            return () => {
                window.removeEventListener('scroll', scrollListener)
            }
        }

    }, [props.isTouched])

    useEffect(() => {
        console.log(props.isTouched)
        if (props.isTouched !== true) {

            let heightDoc = document.documentElement.clientWidth

            if (coords) {
                if (coords.y < (heightDoc / 2) && coords.y > -50) {
                    ref.current.pause()
                }
                if (coords.bottom < (heightDoc / 2) || coords.y < 100) {
                    ref.current.play()
                }
            }
        }
    }, [coords, props.isTouched])

    return (

        <Grid style={{marginTop: 20}} item xs={12} sm={6} md={6}>
            <ScrollAnimation animateOnce animateIn="fadeIn">
                <FadeIn>
                    <Card onClick={() => props.isTouchedHandler && props.isTouchedHandler()} className={classes.card}>
                        <video ref={ref}
                               className={classes.video}
                               loop
                               muted
                               controls
                               autoPlay={false}
                               src={props.video}/>
                    </Card>
                </FadeIn>
            </ScrollAnimation>
        </Grid>

    )
})

export const UsersViewElement = React.memo((props: UserType) => {

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
            video: {
                height: '100%',
                width: '100%',

            }


        }),
    )

    const classes = useStyles()
    const dispatch = useDispatch()
    const favorites = useSelector<AppStateType, UserType[]>(state => state.reducer.favorites)
    const {lang} = useSelector<AppStateType, any>(state => state.reducer)

    const addFavoriteHandler = () => {
        dispatch(addToFavorites(props.user))
        saveState([...favorites, props.user])
    }

    const removeFavoriteHandler = () => {
        dispatch(removeFromFavorites(props.user))
        saveState(favorites.filter((e) => props.user.id !== e.id))
    }


    return (

        <Grid style={{marginTop: 20}} item xs={12} sm={6} md={6}>
            <ScrollAnimation animateOnce animateIn="fadeIn">
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
                                        {
                                            props.isFavorite
                                                ? <IconButton onClick={removeFavoriteHandler}
                                                              aria-label="delete">
                                                    <StarIcon fontSize={"large"}
                                                              style={{color: yellow[500]}}

                                                    />
                                                </IconButton>

                                                : <IconButton onClick={addFavoriteHandler}
                                                              aria-label="delete">
                                                    <StarIcon fontSize={"large"}
                                                              style={{color: grey[500]}}

                                                    />
                                                </IconButton>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        {
                                            (lang === 'en')
                                                ? `${props.age} years old`
                                                : `${props.age} ${ageMaker(props.age)}`
                                        }
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
})

