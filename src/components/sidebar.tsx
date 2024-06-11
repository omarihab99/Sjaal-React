
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface OffcanvasMenuProps {
    show: boolean;
    handleClose: () => void;
}
const SideBar: React.FC<OffcanvasMenuProps> = ({ show, handleClose }) => {
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default SideBar;
