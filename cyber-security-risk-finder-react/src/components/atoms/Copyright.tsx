import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © Mauricio Montoya Medrano '}
    <Link color="inherit" to="https://bitcubico.com/" target={"_blank"}>
      mcubico.com
    </Link>
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Copyright