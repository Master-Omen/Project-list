import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"
import { Carousel } from 'react-bootstrap';

function Videos({ rawData }) {
    const [show, setShow] = useState(false);

    function handleClick() {
        setShow(!show)
    }

    return (
        <>
            {!show && (
                <button onClick={handleClick} className="rounded-5 overflow-hidden shadow border-0 p-0 w-100 h-100 position-relative">
                    <img src={rawData.videos["thumbnail"]["url"]} alt="img-thumbnail" className="object-fit-cover w-100 h-100" />

                    <img src="/images/playIcon.png" alt="" className="position-absolute bottom-0 start-0" style={{ width: "12vh" }} />
                </button>

            )}

            {show && (

                <video className="w-100 h-100 shadow rounded-5 border bg-dark" controls>
                    <source src={rawData.videos["playbackURLs"][0]["url"]} type="video/mp4" />
                </video>

            )}
        </>
    )

}

export default function Detail({ rawData, statusButton }) {

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState("");
    const [disableBtn, setdisableBtn] = useState(false);
    const [updateStatus, setUpdateStatus] = useState("");

    useEffect(() => {
        if (flash.message) {

            setFlashMsg(flash.message)

            const timeout = setTimeout(() => {
                setFlashMsg("");
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [flash.message]);

    function handleAdd() {
        setdisableBtn(true)
        router.post('/detail', {}, { preserveScroll: true, onFinish: () => setdisableBtn(false) });
    }

    function handleDelete() {
        setdisableBtn(true);
        router.delete(`/detail/${rawData.imdbId}`, { preserveScroll: true, onFinish: () => setdisableBtn(false) });
    }

    function handleUpdate() {
        setdisableBtn(true);
        router.put(`/detail/${rawData.imdbId}`, {}, { preserveScroll: true, onFinish: () => setdisableBtn(false) });

        // percantik date
        const rawDate = rawData.updated_at;
        const date = new Date(rawDate);

        const formatted = new Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);

        setUpdateStatus(formatted);
    }

    return (
        <>
            <div className="container my-5">

                <div className="row mb-2">
                    <div className="col-8 col-sm-7 col-md-5 col-lg-3 p-1" style={{ height: "55vh" }} >
                        <img src={rawData.image} className="w-100 h-100 rounded-5 border shadow object-fit-cover" />
                    </div>

                    <div className="col-4 col-sm-5 col-md-7 col-lg-9 p-1" style={{ height: "55vh" }}>
                        {rawData.videos && <Videos rawData={rawData} />}
                        {!rawData.videos &&
                            <img src="/images/novideo.jpg" className="w-100 h-100 border shadow rounded-5 object-fit-contain bg-white" />
                        }
                    </div>
                </div>

                <div className="row">

                    <div className="col-12 col-lg-12 col-xl-6 p-1 ">
                        <div className="bg-white border rounded-5 shadow mb-2 position-relative p-4" style={{ height: "45vh" }}>

                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <h4 className="m-0 pe-4 text-primary">{rawData.name}</h4>
                                    {rawData.alterName ? <span>{rawData.alterName}</span> : ""}
                                </div>

                                <p className="m-0" style={rawData.rating < 6 ? { color: "darkred" } : { color: "#228B22" }}>⭐{rawData.rating}</p>
                            </div>

                            <p className="m-0"> <span className="fw-bold">Type : </span>{rawData.titleType} ~ {rawData.contentRating} </p>
                            <p className="m-0"><span className="fw-bold">Date : </span> {rawData.datePublished} </p>
                            <p className="m-0"><span className="fw-bold">Runtime : </span> {rawData.runtime}</p>


                            <div className="d-flex flex-wrap gap-2 my-2">
                                {rawData.genre["genres"].map((item) => <div key={item.text} className="border shadow-sm px-2 py-1 rounded-5 ">{item.text}</div>)}
                            </div>

                            <p>{rawData.description}</p>

                            <div className="position-absolute end-0 bottom-0 px-3 my-3 d-flex justify-content-between align-items-center  w-100" >
                                <div>

                                    {flashMsg &&
                                        <div className="alert alert-primary px-3 py-1 mx-2 my-0 rounded-5">{flashMsg}</div>
                                    }
                                </div>
                                <div>

                                    {statusButton == "Add" &&

                                        <button onClick={handleAdd} className="btn btn-outline-primary rounded-5" disabled={disableBtn}>Add</button>

                                    }

                                    {statusButton == "Added" &&

                                        <button onClick={handleDelete} className="btn btn-outline-danger rounded-5 me-2" disabled={disableBtn}>Delete</button>

                                    }

                                    {statusButton == "Added" &&

                                        <button onClick={handleUpdate} className="btn btn-outline-primary rounded-5" disabled={disableBtn}> {updateStatus ? "Updated at " + updateStatus : "Update"}</button>

                                    }


                                </div>


                            </div>
                        </div>

                    </div>

                    <div className="col-12 col-md-12 col-lg-12 col-xl-6 p-1">
                        <div className="bg-dark border rounded-5 shadow overflow-hidden" >
                            <Carousel interval={null} >
                                {rawData.images.map((item, index) =>
                                    <Carousel.Item key={index}>
                                        <img src={item.node["url"]} alt="image" className="w-100 object-fit-contain" style={{ height: "45vh" }} />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                    </div>


                </div>


            </div >
        </>
    )
}