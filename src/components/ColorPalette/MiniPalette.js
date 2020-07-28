import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../styles/ColorPalette/MiniPalette.css";
import { removePalette } from "../../redux/palettes/actions";
import ConfirmDialog from "./ConfirmDialog";

class MiniPalette extends Component {
    state = {
        confirm: false,
    };
    handleDelete = (e) => {
        e.stopPropagation();
        // this.props.removePalette(this.props.id);
        this.setState({ confirm: true });
    };
    closeDiglog = () => this.setState({ confirm: false });
    deletePalette = () => {
        this.closeDiglog();
        this.props.removePalette(this.props.id);
    };
    render() {
        const { id, colors } = this.props;
        return (
            <div className="MiniPalette">
                <Link to={`/palette/${id}`}>
                    <div className="MiniPalette-colors">
                        {colors.map((c, i) => (
                            <div
                                className="MiniPalette-color"
                                key={`MiniPalette-${id}-${i}`}
                                style={{ backgroundColor: c.color }}
                            ></div>
                        ))}
                    </div>
                    <div className="MiniPalette-footer">
                        {this.props.paletteName}
                        <span className="MiniPalette-emoji">
                            {this.props.emoji}
                        </span>
                    </div>
                </Link>
                <DeleteIcon
                    className="MiniPalette-delete"
                    fontSize="large"
                    onClick={this.handleDelete}
                />
                <ConfirmDialog
                    open={this.state.confirm}
                    handleCancel={this.closeDiglog}
                    handleConfirm={this.deletePalette}
                />
            </div>
        );
    }
}

export default connect(null, { removePalette })(MiniPalette);
