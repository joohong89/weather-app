import {useTheme} from "../context/ThemeContext.jsx";
import {Button} from "react-bootstrap";
import {MdDarkMode, MdLightMode} from "react-icons/md";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button variant="link" className="theme-toggle-button text-decoration-none" onClick={toggleTheme}>
             {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </Button>
    );
}
export default ThemeToggle
