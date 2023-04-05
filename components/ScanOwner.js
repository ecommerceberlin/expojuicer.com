import {
    Box,
    Avatar,
    resizeCloudinaryImage,
    Grid,
    makeStyles,
    Typography
} from 'eventjuicer-site-components';

import Link from 'next/link'

const useStyles = makeStyles(theme => ({ 

    root : {
        maxWidth: 600,
        marginTop: 40
    },
    avatarContainer: {
        minHeight: 125,
        minWidth: 125,
    },
    avatarImg: {
        objectFit: "contain",
        maxHeight: "85%",
        maxWidth: "85%",
    },
}));

const ScanOwner = ({name="", logotype="", title="Your scans will be saved for"}) => {

    const classes = useStyles()

    return (
    <Box className={classes.root} >
    <Grid container direction="column" justifyContent="center" alignItems="center">
    <Grid item>
    <Typography variant="h5" align="center" display='block'>{title}:</Typography>
    </Grid>
    <Grid item>
    {logotype && <Avatar variant="square" src={ resizeCloudinaryImage(logotype, 150, 150) } classes={{
              root:classes.avatarContainer,
              img: classes.avatarImg
    }}/>}
    </Grid>
    <Grid item>
    <Typography variant="overline" align="center" display='block'>Error? <Link href="/">Go back to company selection</Link></Typography>
    </Grid>
    </Grid>
    </Box>)

}

export default ScanOwner