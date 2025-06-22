import { Link, useForm } from "@inertiajs/react"


export default function Search({ rawData }) {


    const { data, setData, get, processing } = useForm({
        keywords: '',
    })

    function handleSubmit(e) {
        e.preventDefault();
        get('/search')

    }

    return (
        <>
            <div className="container my-5">
                <div className="row row-cols-2 mb-4">
                    <form onSubmit={handleSubmit} className="w-100 d-flex">
                        <input type="text" className="w-100 border-1 px-3 rounded-start-3" placeholder="input here..." value={data.keywords} onChange={(e) => setData('keywords', e.target.value)} disabled={processing} />

                        <button type="submit" className="btn btn-dark rounded-end-3 rounded-start-0" disabled={processing}>{processing ? <span>Loading⭕</span> : "Search"}</button>
                    </form>
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

                    {rawData.map((item) =>
                        < div key={item["#IMDB_ID"]} className="col"  >
                            <Link href={`/detail/${item['#IMDB_ID']}`} className="link-underline link-underline-opacity-0">

                                <div className="img-button-search mb-4 rounded-3" >
                                    <img src={item['#IMG_POSTER'] || 'images/no Image Avaible.jpg'} className="w-100 object-fit-cover rounded-top-3" style={{ height: '35vh' }} />

                                    <div className="py-1 text-center">
                                        <h6 className="m-0 fw-bold">{(item["#TITLE"].length > 20 ? item["#TITLE"].slice(0, 20) + ".." : item["#TITLE"])}</h6>
                                        <p className="m-0 text-dark">{item["#YEAR"] ? item["#YEAR"] : "N/A"}</p>
                                    </div>
                                </div>

                            </Link>
                        </div>

                    )}
                </div>

            </div >
        </>
    );
}