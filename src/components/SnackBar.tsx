import Snackbar from '@material-ui/core/Snackbar';

export type SnackBarStateProps = {
  open: boolean;
  message?: string;
  backgroundColor: string;
};

export default function SnackBar(props) {
  return (
    <Snackbar
      open={props.open}
      message={props.message}
      ContentProps={{
        style: {
          backgroundColor: props.backgroundColor,
        },
      }}
      onClose={props.onClose}
    />
  );
}
