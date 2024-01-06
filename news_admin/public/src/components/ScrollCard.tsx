import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import { NewsType } from '../pages/Home'
import './ScrollCard.css'
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const styles = {
    card: {
        mb: 5,
        background: "#F5F5F5",
        borderRadius: 6
    },
    grid1: {
        position: 'relative',
        maxHeight: 300
    },
    image: {
        borderRadius: 8,
        objectFit: "cover"
    },
    overlay: {
        position: 'absolute',
        bottom: 32,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.54)',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderRadius: 2
    },
    title: {
        fontSize: '22px',
        padding: '10px'
    },
    titleMain: {
        fontSize: '28px',
        
    }
   

}

const ScrollCard = ({ news }: { news: NewsType }) => {
    console.log("product : ",news)

    const { id, title, images, createdAt,information, loc_id, updatedAt, category_id } = news;

    //readmore
    
    var information1 = information.slice(0, 200);
    var information2 = information.slice(201,300);
    const [readmore, setReadmore] = useState(false);
    const handleReadmore = () => {
        setReadmore(!readmore);
    }
    //readmore end

    return (

        <Card sx={styles.card} className="camponent">
            <CardContent >
                
                <Grid container>

                    <Grid item xs={12} sm={5} md={5} lg={5} sx={styles.grid1}>

                          {/* =============> */}
                       <Box sx={{textDecoration:"none"}} component={Link} to={`/fullscreen/${id}`}>
                       <CardMedia
                            component="img"
                            alt="image"
                            height="270"
                            width="80%"
                            image={images}
                            sx={styles.image}  
                        />
                       </Box>
                       

                        <Box
                            sx={styles.overlay}
                        >
                            <Typography variant="h5" sx={styles.title}>{title}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={7} md={7} lg={7} sx={{ pl: 2 }}>
                        {/* title */}
                        <Typography variant='h6' className="titleMain" sx={styles.titleMain}>{title}</Typography>
                        {/* category */}
                        <Typography><b>"Hello"</b> / {updatedAt}</Typography>

                        {readmore ? <Typography>{information1}</Typography> : <Typography>{information2}</Typography>}
                        <Button onClick={handleReadmore}>{readmore ? "Read less" : "Read more..."}</Button>

                    </Grid>

                </Grid>

            </CardContent>
        </Card>


    )
}

export default ScrollCard;

