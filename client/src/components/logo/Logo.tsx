import logo from './customerioLogo.png'

export const Logo = () => {
    return (
        <div
            className="bg-cover bg-center h-24 w-96"
            style={{ backgroundImage: `url(${logo})` }}
       />

    )
}