import Navbar from '@/Components/Navbar'

export default function Layout({ children }) {

    return <>

        <header>
            <Navbar />
        </header>

        <main>
            {children}
        </main>

        <footer>
            <p className='d-flex justify-content-center py-3 border-top my-4 '>Created by E, 2025</p>
        </footer>



    </>

}