import { router } from "@inertiajs/react";
import '/resources/styles/paginator.css'
import { useWindowSize } from "react-use";


export default function Paginator({ rawData, type, order, handleOrder }) {

    const { width } = useWindowSize();

    const pCss = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0 text-start";
    const pCssSm = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0 text-center";

    const btnCss = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0 d-flex justify-content-end";
    const btnCssSm = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0 d-flex justify-content-center";

    let fixType;

    if (type == "TVSeries" ? fixType = type.replace("TVSeries", "Series") : type);
    if (type == "VideoGame" ? fixType = type.replace("VideoGame", "Game") : type);

    function handlePage(id) {
        router.get(id, { preserveScroll: true, onFinish: () => setdisableBtn(false) });
    }

    return (
        <>
            <div className="row mb-2">

                <div className={width < 1002 ? pCssSm : pCss}>
                    <p className="paginator-p m-0 py-1">Showing <span>{rawData.from}</span> to <span>{rawData.to}</span> of <span>{rawData.total}</span> {fixType ? fixType : type} items</p>
                </div>


                <div className={width < 1002 ? btnCssSm : btnCss}>

                    <button className="me-1 rounded-2" onClick={() => handlePage(rawData.first_page_url)} disabled={rawData.prev_page_url
                        == null}>First</button>

                    {rawData.links.map((btn) => {

                        let fixLabel;
                        fixLabel = btn.label.replace("Next &raquo;", ">>");
                        fixLabel = fixLabel.replace("&laquo; Previous", "<<");

                        return (

                            <button key={btn.label} className="border me-1 rounded-2" onClick={() => handlePage(btn.url)} disabled={btn.url == null} style={btn.active ? { color: "#0d6efd", boxShadow: "0px 0px 3px" } : {}} >
                                {fixLabel}
                            </button >

                        )

                    }

                    )}

                    <button className="border me-1 rounded-2" onClick={() => handlePage(rawData.last_page_url)} disabled={rawData.next_page_url == null}>Last</button>

                    <select className="rounded-2 bg-light border-1 border-primary text-primary text-center shadow-sm" value={order} onChange={handleOrder}>
                        <option value="created_at">Latest</option>
                        <option value="year" >Newest Year</option>
                        <option value="year/asc" >Oldest Year</option>
                        <option value="rating" >Rating</option>
                        <option value="rating/asc" >Rating Low</option>
                        <option value="created_at/asc">Oldest</option>
                    </select>

                </div>

            </div>


        </>


    )
}