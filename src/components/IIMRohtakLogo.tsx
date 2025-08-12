import { Link } from "react-router-dom";

const IIMRohtakLogo = () => {
  return (
    <Link to="/" className="fixed top-4 left-4 z-50 opacity-80 hover:opacity-100 transition-opacity">
      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glass shadow-lg">
        <span className="text-white font-bold text-sm">IIM</span>
      </div>
    </Link>
  );
};

export default IIMRohtakLogo;