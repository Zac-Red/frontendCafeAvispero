import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const FeedSnackBar = ({open, message, Close, vertical, horizontal, type="success"}) => {
  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={Close}
      key={vertical + horizontal}
    >
      <Alert
          onClose={Close}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
    </Snackbar>
  )
}
