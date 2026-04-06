export default function Drawer({ children, onClose, isOpen }) {
    return (
        <>
            <div className={[
                "overlay",
                isOpen && "open"
            ].filter(Boolean).join(" ")} onClick={onClose} />
            <div className={[
                "drawer",
                isOpen && "open"
            ].filter(Boolean).join(" ")} >
                {children}
            </div>
        </>
    )
}