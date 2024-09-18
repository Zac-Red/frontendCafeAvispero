import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const Error404 = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="col-sn-10 col-sn-offset-1 text-center">
                    <div className="gif_image">
                        <Typography variant='h1'>404</Typography>
                    </div>
                    <div className="content_box_404">
                        <Typography variant='h4'>Parece que te perdiste...</Typography>
                        <Typography variant='body1'>
                            La pagina que buscas no esta disponible o no existe
                        </Typography>
                        <Link to="/">
                            <Button variant="contained" color="success">
                                <Typography variant='h5'>Regresar</Typography>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
