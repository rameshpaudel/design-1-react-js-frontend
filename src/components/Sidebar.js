const {
  Shield,
  Users,
  FileText,
  PieChart,
  ChartColumnBig,
} = require("lucide-react");
const { useLocation, Link } = require("react-router-dom");

const Sidebar = () => {
  const pathName = useLocation().pathname;

  const activeClassName = (path) => {
    return pathName === path
      ? "text-white bg-teal-600"
      : "text-gray-300 hover:bg-gray-700";
  };

  return (
    <aside className="w-64 bg-gray-800 p-6">
      <div className="flex items-center mb-8">
        <Shield className="h-8 w-8 text-teal-400 mr-2" />
        <h1 className="text-2xl font-bold text-white">MalwarePro</h1>
      </div>
      <nav>
        <Link
          to="/admindash"
          className={`block py-2 px-4 rounded-md  mb-2 ${activeClassName(
            "/admindash"
          )}`}
        >
          <ChartColumnBig className="inline-block mr-2" /> Dashboard
        </Link>

        <Link
          to="/upload-and-train"
          className={`block py-2 px-4 rounded-md ${activeClassName(
            "/upload-and-train"
          )} mb-2`}
        >
          <FileText className="inline-block mr-2" /> Upload And Train
        </Link>
        {/* <Link
          to="/reports"
          className={`block py-2 px-4 rounded-md ${activeClassName(
            "/reports"
          )} mb-2`}
        >
          <PieChart className="inline-block mr-2" /> Reports
        </Link> */}
        <Link
          to="/user"
          className={`block py-2 px-4 rounded-md  mb-2 ${activeClassName(
            "/user"
          )}`}
        >
          <Users className="inline-block mr-2" /> User Management
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
