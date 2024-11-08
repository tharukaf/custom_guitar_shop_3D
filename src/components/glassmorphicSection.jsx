import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';

export default function GlassmorphicSection({ children, ...props }) {
  return (
    <div className="customizerItem">
      <div className="glass-effect">
        <Typography variant="h4" component="h2">
          {props.title}
        </Typography>
        {children}
      </div>
    </div>
  );
}
GlassmorphicSection.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
