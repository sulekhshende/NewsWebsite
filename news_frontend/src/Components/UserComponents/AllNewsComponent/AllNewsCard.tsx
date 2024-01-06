import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import { ProductType } from '../AllNews'

import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const styles = {
    card: {
        mb: 5,
        background: "#dad4d4",
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







const AllNewsCard = ({ product }: { product: ProductType }) => {
    console.log("product : ",product)

    const { id,name, image_link, category, description, created_at } = product;

    //readmore
    
    var descp = description.slice(0, 100);
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
                       <Box sx={{textDecoration:"none"}} component={Link} to={`fullscreen/${id}`}>
                       <CardMedia
                            component="img"
                            alt={category}
                            height="270"
                            width="80%"
                            image={image_link}
                            sx={styles.image}  
                        />
                       </Box>
                       

                        <Box
                            sx={styles.overlay}
                        >
                            <Typography variant="h5" sx={styles.title}>{name}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={7} md={7} lg={7} sx={{ pl: 2 }}>
                        {/* title */}
                        <Typography variant='h6' className="titleMain" sx={styles.titleMain}>{name}</Typography>
                        {/* category */}
                        <Typography><b>{category}</b> / {created_at}</Typography>

                        {readmore ? <Typography>{description}</Typography> : <Typography>{descp}</Typography>}
                        <Button onClick={handleReadmore}>{readmore ? "Read less" : "Read more..."}</Button>
                        
                        <Box component="div" sx={{float: "right"}}>
                        <Button variant='contained'  color="error" size="small">Delete</Button>
                        </Box>
                       
                    </Grid>

                </Grid>

            </CardContent>
        </Card>


    )
}

export default AllNewsCard;

