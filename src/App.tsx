import { ToastContainer } from "react-toastify"
import AppRouter from "./routes/AppRouter"
import Loading from "./components/commons/Loading"
import Footer from "./components/footer/Footer"

const App = () => {
  return (
    <>
      <div className="body">
        <Loading />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <AppRouter/>
        <Footer />
      </div>
    </>
  )
}

export default App