import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function GlassmorphicSection({ title, children }) {
    return (
        <div className="glass-effect">
            <Typography

                sx={{
                    color: "#1A1A1A",
                    marginBottom: "1rem",
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-4px",
                        left: 0,
                        width: "2rem",
                        height: "2px",
                        background: "linear-gradient(90deg, #1A1A1A 0%, rgba(26, 26, 26, 0.3) 100%)",
                        borderRadius: "2px"
                    }
                }}
            >
                {title}
            </Typography>
            <div style={{
                color: "#1A1A1A",
                fontSize: "0.875rem",
                letterSpacing: "-0.01em",
                lineHeight: 1.5
            }}>
                {children}
            </div>
        </div>
    );
}

GlassmorphicSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
