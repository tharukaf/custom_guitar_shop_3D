import { Typography, Button } from "@mui/material";
import { guitarColors } from "../util/guitarColors";
import GlassmorphicSection from "../components/glassmorphicSection";
import Switch from '@mui/material/Switch';
import PropTypes from "prop-types";
import '../styles/guitar.css';

export default function Customizers({ changeGuitarConfig, guitar, handleChangeOrientation }) {
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
                            style={{ backgroundColor: color, width: "10px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ body: { color: color } })}
                        />
                    ))}
                    <label htmlFor="bodyColor"><Typography variant="h6">Custom Body Color</Typography></label>
                    <input type="color" value={guitar.body.color} onChange={(e) => changeGuitarConfig({ body: { color: e.target.value } })} />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Material">
                <div>
                    {[{
                        name: "Ebony",
                        color: "#141313",
                        class: 'neck-material-ebony'
                    }, {
                        name: "Maple",
                        color: "#d4ad72",
                        class: 'neck-material-maple'
                    }, {
                        name: "Rosewood",
                        color: "#311216",
                        class: 'neck-material-rosewood'
                    }].map((wood) => (
                        <Button
                            sx={{ color: wood.name === 'Maple' ? 'black' : 'white' }}
                            key={wood.color}
                            className={wood.class}
                            style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
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
                            style={{ backgroundColor: color, width: "10px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ headstock: { color: color } })}
                        />
                    ))}
                    <label htmlFor="headstockColor"><Typography variant="h6">Custom Headstock Color</Typography></label>
                    <input id="headstockColor" type="color" value={guitar.headstock.color} onChange={(e) => changeGuitarConfig({ headstock: { color: e.target.value } })} />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Cover Color">
                <div>
                    {[{
                        name: "Black",
                        color: "#000000",
                    }, {
                        name: "Chrome",
                        color: "#C0C0C0",
                    }, {
                        name: "Gold",
                        color: "#FFD700",
                    }].map((material) => (
                        <Button
                            key={material.color}
                            style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ pickups: { color: material.color } })}
                        />
                    ))}
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Hardware Material">
                <SelectedItem item={guitar.hardware} />
                <div>
                    {[{
                        name: "Black Metal",
                        color: "#141313",
                    }, {
                        name: "Chrome",
                        color: "#C0C0C0",
                    }, {
                        name: "Gold",
                        color: "#FFD700",
                    }].map((material) => (
                        <Button
                            key={material.color}
                            style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ hardware: { color: material.color, name: material.name } })}
                        />
                    ))}
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Inlay Color">
                <div>
                    {[{
                        name: "Black",
                        color: "#000000",
                    }, {
                        name: "Pearl",
                        color: "#F5F5F5",
                    }, {
                        name: "Abalone",
                        color: "#88ACA1",
                    }, {
                        name: "Gold",
                        color: "#FFD700",
                    }].map((material) => (
                        <Button
                            key={material.color}
                            style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ graphics: { color: material.color } })}
                        />
                    ))}
                    <label htmlFor="neckInlayColor"><Typography variant="h6">Custom Neck Inlay Color</Typography></label>
                    <input type="color" value={guitar.graphics.color} onChange={(e) => changeGuitarConfig({ graphics: { color: e.target.value } })} />
                </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Binding Color">

                {[{
                    name: "Black",
                    color: "#000000",
                }, {
                    name: "Cream",
                    color: "#FFFDD0",
                }, {
                    name: "White",
                    color: "#FFFFFF",
                }, {
                    name: "Ivory",
                    color: "#FFFFF0",
                }].map((material) => (
                    <Button
                        key={material.color}
                        style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                        onClick={() => changeGuitarConfig({ binding: { color: material.color } })}
                    />
                ))}
            </GlassmorphicSection>
            <GlassmorphicSection title="Knob Material">
                <SelectedItem item={guitar.knobs} />
                <div>
                    {[{
                        name: "Plastic",
                        color: "#000000",
                    }, {
                        name: "Chrome",
                        color: "#C0C0C0",
                    }, {
                        name: "Gold",
                        color: "#FFD700",
                    }].map((material) => (
                        <Button
                            key={material.color}
                            style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                            onClick={() => changeGuitarConfig({ knobs: { color: material.color, name: material.name } })}
                        />
                    ))}
                </div>
            </GlassmorphicSection></>
    )
}

Customizers.propTypes = {
    changeGuitarConfig: PropTypes.func.isRequired,
    guitar: PropTypes.object.isRequired,
    handleChangeOrientation: PropTypes.func.isRequired,
};

function SelectedItem({ item }) {
    return (
        <div className="selected-item">
            <Typography>
                {item.name}
            </Typography></div>
    )
}
SelectedItem.propTypes = {
    item: PropTypes.object.isRequired,

};