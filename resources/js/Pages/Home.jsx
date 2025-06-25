import { Link } from "@inertiajs/react";
import '/resources/styles/home.css';

export default function Home() {

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="rounded-5 p-5 border shadow-sm text-center">
                    <h1 className="border-bottom pb-2">HELLO <span className="text-primary">WORLD</span></h1>
                    <p>Start search & save to your list about of game, movie, series or all of them.</p>

                    <Link href={'/search'} className="btn btn-primary me-1">Search</Link>
                    <Link href={'/list'} className="btn btn-outline-dark">List</Link>
                </div>
            </div>

            <div className="container">
                <h1 className="border-bottom pb-2 mb-3 text-center text-secondary">PICK YOUR LIST</h1>
                <div className="row">
                    <div className="home-class col col-3 mb-4" >
                        <Link href={'/list'} className="link-underline link-underline-opacity-0 position-relative">
                            <img className="w-100 h-100 object-fit-cover" src="/images/cover/all.png" />
                            <h3 className="text-center my-1">All</h3>
                        </Link>
                    </div>

                    <div className="home-class col col-3" >
                        <Link href={'/list/TVSeries'} className="link-underline link-underline-opacity-0">
                            <img className="w-100 h-100 object-fit-cover" src="/images/cover/series.png" />
                            <h3 className="text-center my-1">Series</h3>
                        </Link>
                    </div>

                    <div className="home-class col col-3" >
                        <Link href={'/list/Movie'} className="link-underline link-underline-opacity-0">
                            <img className="w-100 h-100 object-fit-cover" src="/images/cover/movie.png" />
                            <h3 className="text-center my-1">Movies</h3>
                        </Link>
                    </div>

                    <div className="home-class col col-3" >
                        <Link href={'/list/VideoGame'} className="link-underline link-underline-opacity-0">
                            <img className="w-100 h-100 object-fit-cover" src="/images/cover/game.png" />
                            <h3 className="text-center my-1">Games</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}