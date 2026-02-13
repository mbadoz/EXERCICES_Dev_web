const TabButton = ({ children, onSelect }: { children: string, onSelect: () => void }) => {
    return (
        <button onClick={onSelect}>
            {children}
        </button>
    );
}; export default TabButton;