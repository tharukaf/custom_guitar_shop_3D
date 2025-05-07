import { Typography, Button, IconButton } from "@mui/material";
import { guitarColors, getColorName } from "../util/guitarColors";
import GlassmorphicSection from "../components/glassmorphicSection";
import Switch from '@mui/material/Switch';
import PropTypes from "prop-types";
import '../styles/guitar.css';
import { useState, memo, useCallback } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Create a reusable component to display selected color names
const SelectedColor = memo(function SelectedColor({ color }) {
    return (
        <div className="selected-color" style={{
            marginTop: "12px",
            padding: "8px 12px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        }}>
            <div style={{
                width: "24px",
                height: "24px",
                backgroundColor: color,
                borderRadius: "4px",
                marginRight: "8px",
                border: "1px solid rgba(0, 0, 0, 0.1)"
            }} />
            <Typography variant="body1" fontWeight={500}>
                <span style={{ color: "#333" }}>{getColorName(color)}</span>
            </Typography>
        </div>
    );
});

SelectedColor.propTypes = {
    color: PropTypes.string.isRequired
};

// Memoized tab content components
const BasicSettingsTab = memo(function BasicSettingsTab({ guitar, changeGuitarConfig, handleChangeOrientation }) {
    return (
        <>
            <GlassmorphicSection title="Orientation">
                <div>
                    <Typography>{guitar.orientationLeft === true ? "Left Handed" : "Right Handed"}</Typography>
                    <Switch
                        checked={guitar.orientationLeft}
                        onChange={handleChangeOrientation}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Body Color">
                <div>
                    {guitarColors.map((color) => (
                        <Button
                            key={color}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ body: { color: color } })}
                        />
                    ))}
                    <label htmlFor="bodyColor"><Typography>Custom Color</Typography></label>
                    <input type="color" value={guitar.body.color} onChange={(e) => changeGuitarConfig({ body: { color: e.target.value } })} />
                    <SelectedColor color={guitar.body.color} />
                </div>
            </GlassmorphicSection>
        </>
    );
});

BasicSettingsTab.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
    handleChangeOrientation: PropTypes.func.isRequired,
};

const NeckHeadstockTab = memo(function NeckHeadstockTab({ guitar, changeGuitarConfig }) {
    return (
        <>
            <GlassmorphicSection title="Neck Material">
                <div>
                    {[
                        {
                            name: "Ebony",
                            color: "#d4ad72",
                            class: 'neck-material-maple'
                        },
                        {
                            name: "Maple",
                            color: "#d4ad72",
                            class: 'neck-material-maple'
                        },
                        {
                            name: "Rosewood",
                            color: "#d4ad72",
                            class: 'neck-material-maple'
                        }
                    ].map((wood) => (
                        <Button
                            key={wood.name}
                            sx={{
                                color: "#1A1A1A",
                                margin: "4px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                background: `url("../assets/guitar_neck_materials/${wood.name.toLowerCase()}.webp")`,
                                backgroundSize: "cover",
                                fontWeight: 500,
                                textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    transition: "transform 0.2s"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ neck: { color: wood.color } })}
                        >
                            {wood.name}
                        </Button>
                    ))}
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Headstock Color">
                <div>
                    {guitarColors.map((color) => (
                        <Button
                            key={color}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ headstock: { color: color } })}
                        />
                    ))}
                    <label htmlFor="headstockColor"><Typography>Custom Color</Typography></label>
                    <input id="headstockColor" type="color" value={guitar.headstock.color} onChange={(e) => changeGuitarConfig({ headstock: { color: e.target.value } })} />
                    <SelectedColor color={guitar.headstock.color} />
                </div>
            </GlassmorphicSection>
        </>
    );
});

NeckHeadstockTab.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
};

const HardwareDetailsTab = memo(function HardwareDetailsTab({ guitar, changeGuitarConfig }) {
    return (
        <>
            <GlassmorphicSection title="Pickup Cover Color">
                <div>
                    {[
                        {
                            name: "Chrome",
                            color: "#141313",
                            metallic: true,
                            gradient: "linear-gradient(135deg,rgb(17, 17, 17) 0%,rgb(43, 43, 43) 50%,rgb(27, 27, 27) 100%)"
                        },
                        {
                            name: "Chrome",
                            color: "#C0C0C0",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%)"
                        },
                        {
                            name: "Gold",
                            color: "#FFD700",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%)"
                        }
                    ].map((material) => (
                        <Button
                            key={material.name}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: material.metallic ? material.gradient : material.color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: material.metallic ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                position: "relative",
                                overflow: "hidden",
                                "&::after": material.metallic ? {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)",
                                    pointerEvents: "none"
                                } : {},
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: material.metallic ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ pickups: { color: material.color } })}
                        />
                    ))}
                    <SelectedColor color={guitar.pickups.color} />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Hardware Material">
                <div>
                    {[
                        {
                            name: "Black Metal",
                            color: "#141313",
                            metallic: true,
                            gradient: "linear-gradient(135deg,rgb(17, 17, 17) 0%,rgb(43, 43, 43) 50%,rgb(27, 27, 27) 100%)"
                        },
                        {
                            name: "Chrome",
                            color: "#C0C0C0",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%)"
                        },
                        {
                            name: "Gold",
                            color: "#FFD700",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%)"
                        }
                    ].map((material) => (
                        <Button
                            key={material.name}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: material.metallic ? material.gradient : material.color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: material.metallic ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                position: "relative",
                                overflow: "hidden",
                                "&::after": material.metallic ? {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)",
                                    pointerEvents: "none"
                                } : {},
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: material.metallic ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ hardware: { color: material.color, name: material.name } })}
                        />
                    ))}
                    <SelectedColor color={guitar.hardware.color} />
                </div>
            </GlassmorphicSection>
        </>
    );
});

HardwareDetailsTab.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
};

const FinishingTouchesTab = memo(function FinishingTouchesTab({ guitar, changeGuitarConfig }) {
    return (
        <>
            <GlassmorphicSection title="Neck Inlay Color">
                <div>
                    {[
                        {
                            name: "Black",
                            color: "#000000"
                        },
                        {
                            name: "Pearl",
                            color: "#F5F5F5",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E0E0E0 100%)"
                        },
                        {
                            name: "Abalone",
                            color: "#88ACA1",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #A8CAC0 0%, #88ACA1 50%, #688A81 100%)"
                        },
                        {
                            name: "Gold",
                            color: "#FFD700",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%)"
                        }
                    ].map((material) => (
                        <Button
                            key={material.name}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: material.metallic ? material.gradient : material.color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: material.metallic ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                position: "relative",
                                overflow: "hidden",
                                "&::after": material.metallic ? {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)",
                                    pointerEvents: "none"
                                } : {},
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: material.metallic ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ graphics: { color: material.color } })}
                        />
                    ))}
                    <label htmlFor="neckInlayColor"><Typography>Custom Color</Typography></label>
                    <input type="color" value={guitar.graphics.color} onChange={(e) => changeGuitarConfig({ graphics: { color: e.target.value } })} />
                    {/* <SelectedColor color={guitar.graphics.color} /> */}
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Binding Color">
                <div>
                    {[
                        {
                            name: "Black",
                            color: "#000000"
                        },
                        {
                            name: "Cream",
                            color: "#FFFDD0",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFFFE0 0%, #FFFDD0 50%, #FFF8C0 100%)"
                        },
                        {
                            name: "White",
                            color: "#FFFFFF",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFFFFF 0%, #FFFFF0 50%, #FFF8DC 100%)"
                        },
                        {
                            name: "Ivory",
                            color: "#FFFFF0",
                            metallic: true,
                            gradient: "linear-gradient(135deg,rgb(209, 209, 209) 0%, #FFFFF0 50%, #FFF8DC 100%)"
                        }
                    ].map((material) => (
                        <Button
                            key={material.name}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: material.metallic ? material.gradient : material.color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: material.metallic ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                position: "relative",
                                overflow: "hidden",
                                "&::after": material.metallic ? {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)",
                                    pointerEvents: "none"
                                } : {},
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: material.metallic ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ binding: { color: material.color } })}
                        />
                    ))}
                    <SelectedColor color={guitar.binding.color} />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Knob Material">
                <div>
                    <SelectedItem item={guitar.knobs} />
                    {[
                        {
                            name: "Plastic",
                            color: "#000000",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%)"
                        },
                        {
                            name: "Chrome",
                            color: "#C0C0C0",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%)"
                        },
                        {
                            name: "Gold",
                            color: "#FFD700",
                            metallic: true,
                            gradient: "linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%)"
                        }
                    ].map((material) => (
                        <Button
                            key={material.name}
                            sx={{
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                padding: 0,
                                margin: "4px",
                                borderRadius: "8px",
                                background: material.metallic ? material.gradient : material.color,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                boxShadow: material.metallic ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
                                position: "relative",
                                overflow: "hidden",
                                "&::after": material.metallic ? {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.1) 100%)",
                                    pointerEvents: "none"
                                } : {},
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: material.metallic ? "0 4px 8px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.2s ease"
                                }
                            }}
                            onClick={() => changeGuitarConfig({ knobs: { color: material.color, name: material.name } })}
                        />
                    ))}
                </div>
            </GlassmorphicSection>
        </>
    );
});

FinishingTouchesTab.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
};

const SelectedItem = memo(function SelectedItem({ item }) {
    return (
        <div className="selected-item">
            <Typography>
                {item.name}
            </Typography>
        </div>
    );
});

SelectedItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default function Customizers({ changeGuitarConfig, guitar, handleChangeOrientation }) {
    const [currentPage, setCurrentPage] = useState(0);

    const tabComponents = [
        { title: "Basic Settings", component: BasicSettingsTab },
        { title: "Neck & Headstock", component: NeckHeadstockTab },
        { title: "Hardware & Details", component: HardwareDetailsTab },
        { title: "Finishing Touches", component: FinishingTouchesTab }
    ];

    const handleNextPage = useCallback(() => {
        if (currentPage < tabComponents.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            // Loop back to first page when at the end
            setCurrentPage(0);
        }
    }, [currentPage, tabComponents.length]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            // Loop back to last page when at the beginning
            setCurrentPage(tabComponents.length - 1);
        }
    }, [currentPage, tabComponents.length]);

    const handleTabSelect = useCallback((index) => {
        setCurrentPage(index);
    }, []);

    const CurrentTabComponent = tabComponents[currentPage].component;

    return (
        <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid rgba(26, 26, 26, 0.1)",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                flexShrink: 0
            }}>
                <IconButton
                    onClick={handlePrevPage}
                    sx={{
                        color: "#1A1A1A",
                        width: "32px",
                        height: "32px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        border: "1px solid rgba(26, 26, 26, 0.1)",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.9)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                        }
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: "0.875rem" }} />
                </IconButton>
                <Typography variant="h5" sx={{
                    color: "#1A1A1A",
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "-0.02em",
                    position: "relative",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "3rem",
                        height: "2px",
                        background: "linear-gradient(90deg, rgba(26, 26, 26, 0.3) 0%, #1A1A1A 50%, rgba(26, 26, 26, 0.3) 100%)",
                        borderRadius: "2px"
                    }
                }}>
                    {tabComponents[currentPage].title}
                </Typography>
                <IconButton
                    onClick={handleNextPage}
                    sx={{
                        color: "#1A1A1A",
                        width: "32px",
                        height: "32px",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        border: "1px solid rgba(26, 26, 26, 0.1)",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.9)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                        }
                    }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: "0.875rem" }} />
                </IconButton>
            </div>
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.05)",
                "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px"
                },
                "&::-webkit-scrollbar-track": {
                    background: "rgba(0, 0, 0, 0.05)",
                    borderRadius: "4px"
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px"
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(0, 0, 0, 0.15)"
                }
            }}>
                <CurrentTabComponent
                    key={`tab-${currentPage}`}
                    guitar={guitar}
                    changeGuitarConfig={changeGuitarConfig}
                    handleChangeOrientation={handleChangeOrientation}
                />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                borderTop: "1px solid rgba(26, 26, 26, 0.1)",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                flexShrink: 0
            }}>
                {tabComponents.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => handleTabSelect(index)}
                        sx={{
                            minWidth: "8px",
                            width: "8px",
                            height: "8px",
                            padding: 0,
                            borderRadius: "50%",
                            background: currentPage === index
                                ? "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)"
                                : "rgba(26, 26, 26, 0.1)",
                            "&:hover": {
                                background: currentPage === index
                                    ? "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)"
                                    : "rgba(26, 26, 26, 0.2)",
                                transform: "scale(1.1)"
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

Customizers.propTypes = {
    changeGuitarConfig: PropTypes.func.isRequired,
    guitar: PropTypes.object.isRequired,
    handleChangeOrientation: PropTypes.func.isRequired,
};