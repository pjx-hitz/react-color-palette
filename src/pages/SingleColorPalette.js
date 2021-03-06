import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Grid } from "@material-ui/core";
import ColorBoxMain from "../components/ColorBoxMain";
import PaletteNavbar from "../components/PaletteNavbar";
import PaletteFooter from "../components/PaletteFooter";
import "../styles/Palette.css";
import { generatePalette } from "../utils/colorHelper";

class SingleColorPalette extends React.Component {
    constructor(props) {
        super(props);

        let id = props.match.params.id;
        let colorId = props.match.params.colorId;
        let palette = props.list.find((p) => p.id === id);
        if (palette) {
            let colors = generatePalette(palette).colors;
            let shades = [];
            for (let key in colors) {
                if (key !== "0") {
                    shades.push(colors[key].find((c) => c.id === colorId));
                }
            }
            this._props = {
                shades,
                name: palette.name,
                emoji: palette.emoji,
            };
        }
    }

    state = {
        format: "hex",
        level: 500,
    };

    changeFormat = (format) => this.setState({ format });

    renderColorBoxes = () => {
        const { format } = this.state;
        return this._props.shades.map((c) => (
            <Grid key={`${this._props.id}-${c.name}`} item sm={6} xs={12}>
                <ColorBoxMain
                    type="single"
                    colorId={c.id}
                    background={c[format]}
                    name={c.name}
                />
            </Grid>
        ));
    };

    render() {
        if (!this._props) {
            return <Redirect to="/" />;
        }
        return (
            <Container className="Palette SingleColorPalette" maxWidth={false}>
                <PaletteNavbar
                    level={this.state.level}
                    format={this.state.format}
                    changeFormat={this.changeFormat}
                />
                <Grid container className="Palette-colors">
                    {this.renderColorBoxes()}
                    <Grid item sm={6} xs={12}>
                        <ColorBoxMain type="back" />
                    </Grid>
                </Grid>
                <PaletteFooter
                    name={this._props.name}
                    emoji={this._props.emoji}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.palettes.list,
});

export default connect(mapStateToProps)(SingleColorPalette);
