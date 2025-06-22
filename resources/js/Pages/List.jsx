import { Link, router, usePage } from "@inertiajs/react"
import Paginator from "@/Components/Paginator"
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";



export default function list({ rawData, type, order }) {

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState("");

    useEffect(() => {
        if (flash.message) {

            setFlashMsg(flash.message)

            const timeout = setTimeout(() => {
                setFlashMsg("");
                flash.message = "";
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [flash.message]);

    // handle css
    const { width } = useWindowSize()

    // handle order
    function handleOrder(e) {
        router.get(`/list/${type}/${e.target.value}`, { preserveScroll: true });
    }

    // handle delete
    const [disableBtn, setdisableBtn] = useState(false)

    function handleDelete(id) {
        setdisableBtn(true);
        router.delete(`/list/${id}`, { preserveScroll: true, onFinish: () => setdisableBtn(false) });
    }

    return (
        <>


            {flashMsg &&
                <div className="position-absolute alert alert-success px-3 py-1 mx-2 my-0 rounded-3 start-0 bottom-0 mb-2">{flashMsg}</div>
            }


            <div className="container py-5">

                <Paginator rawData={rawData} type={type} order={order} handleOrder={handleOrder} />

                {rawData.data.map(item =>

                    <div className="row my-3 shadow rounded-2 overflow-hidden" key={item.imdbId}>
                        <div className="col-4 col-sm-5 col-md-3 col-xl-2 p-0">
                            <img src={item.image} className="w-100 h-100 object-fit-cover" />
                        </div>

                        <div className="col-8 col-sm-7 col-md-9 col-xl-10 bg-white py-3 position-relative">

                            <div className="d-flex justify-content-between">
                                <div className="mb-1">

                                    <Link href={`/detail/${item.imdbId}`} className="link-underline link-underline-opacity-0">
                                        <h5 className="m-0">{width < 993 && item.name.length >= 30 ? item.name.slice(0, 30) + "..." : item.name}</h5>
                                    </Link>

                                    <p className="m-0 pe-3">{width < 993 && item.alterName.length >= 20 ? item.alterName.slice(0, 20) + "..." : item.alterName}</p>
                                </div>
                                <div style={item.rating < 6 ? { color: "#B22222" } : { color: "#228B22" }}>⭐{item.rating}</div>
                            </div>

                            <p>{item.year} ~ <Link href={`/list/${item.type}`} className="link-underline link-underline-opacity-0" >{item.titleType}</Link></p>

                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {item.genre.genres.map(genre =>
                                    <div key={item.imdbId + genre.text} className="px-2 border bg-light shadow-sm rounded-5">
                                        {genre.text}
                                    </div>
                                )}
                            </div>

                            <p className="pb-3">{item.description.slice(0, 50)}...</p>

                            <div className="position-absolute bottom-0 end-0 p-2">
                                <button onClick={() => handleDelete(item.imdbId)} className="btn btn-outline-danger rounded-3" disabled={disableBtn}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                )}

                <Paginator rawData={rawData} type={type} order={order} handleOrder={handleOrder} />

            </div>

        </>
    )
}