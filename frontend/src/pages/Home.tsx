import { Link } from "react-router-dom";


export const Home=()=>{
    return <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <Header />
        <Description />
        <GetStartedButton />
      </div>
    </div>
    </>
}


const Header = () => (
    <div className="mb-4">
    <div className="text-4xl font-bold text-blue-500 mb-4">Postify</div>
    <h1 className="text-4xl font-bold">Stay curious.</h1>
  </div>
  );
  
  const Description = () => (
    <p className="text-lg mb-6">Discover stories, thinking, and expertise from writers on any topic.</p>
  );
  
  const GetStartedButton = () => (
    <Link to={"/signup"}  className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">
      Get Started
    </Link>
  );