interface HeaderProps {
    coursename: string;
}

const Header = ({coursename}: HeaderProps) => {
    return <h1>{coursename}</h1>
}

export default Header