export default function About() {
    return (<>

        <div className="container my-5">
            <div className="border-bottom pb-3 mb-5">
                <h1 className="text-center text-secondary m-0">ABOUT ME</h1>
            </div>


            <div className="row px-5 py-3 mb-3">
                <div className="col-3 p-3">
                    <img src="/images/icons/laravel-icon.png" className="w-100 h-100 object-fit-contain" />
                </div>

                <div className="col-9 ps-5">
                    <h2 className="text-danger text-center border-bottom pb-2">LARAVEL</h2>
                    <p >Laravel is a backend framework that provides all of the features you need to build modern web applications, such as routing, validation, caching, queues, file storage, and more. However, we believe it's important to offer developers a beautiful full-stack experience, including powerful approaches for building your application's frontend.</p>
                </div>
            </div>

            <div className="row px-5 py-3 mb-5">
                <div className="col-9 ps-5">
                    <h2 className="text-center text-info border-bottom pb-2">REACT</h2>
                    <p >React is a front-end JavaScript library, React was developed by the Facebook Software Engineer Jordan Walke. React is a tool for building UI components.</p>
                </div>
                <div className="col-3 p-3">
                    <img src="/images/icons/react-icon.png" className="w-100 h-100 object-fit-contain" />
                </div>
            </div>

            <div className="row px-5 py-3">
                <div className="col-6 p-5 border rounded-3 shadow-sm">
                    <h2 className="text-center text-primary border-bottom pb-2">INERTIA</h2>
                    <p >Thankfully, Laravel offers the best of both worlds. Inertia bridges the gap between your Laravel application and your modern React</p>
                    <p>Create modern single-page React, Vue, and Svelte apps using classic server-side routing. Works with any backend — tuned for Laravel.</p>
                </div>
                <div className="col-6 p-5 border rounded-3 shadow-sm">
                    <h2 className="text-center text-primary border-bottom pb-2">BOOTSTRAP 5</h2>
                    <p >Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript framework for creating responsive, mobile-first websites.</p>
                </div>
            </div>

        </div>

    </>)
}