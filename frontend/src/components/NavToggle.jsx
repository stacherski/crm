function NavToggle() {
    return (
        <>
            <div className="menu-btn">
                <as-class-toggle target-element="[layout] nav|.menu-overlay" target-class="navopen|overlayopen" button-class="btn btn-transparent" icon-name="bars"></as-class-toggle>
            </div>
            <div className="menu-overlay"></div>
        </>
    )
}

export default NavToggle