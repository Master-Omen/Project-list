import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {

    // agar tahu url
    const { url } = usePage()

    return (
        <>
            <div className="navbar d-flex justify-content-center py-3 ">

                <Link href={'/home'} className={url == "/home" ? "nav-link fw-bold border-bottom border-2 me-3" : "nav-link me-3"}>Home</Link>

                <Link href={'/search'} className={url == "/search" ? "nav-link  fw-bold border-bottom border-2 me-3" : "nav-link me-3"}>Search</Link>

                <Link href={'/list'} className={url == "/list" ? "nav-link fw-bold border-bottom border-3 me-3" : "nav-link me-3"}>List</Link>

                <Link href={'/about'} className={url == "/about" ? "nav-link fw-bold border-bottom border-2 me-3" : "nav-link me-3"}>About</Link>

            </div>

        </>
    )
}