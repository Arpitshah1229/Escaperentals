// const Header = ({ title }) => {
//   return (
//     <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6">
//       <h1 className="text-xl font-semibold">{title}</h1>

//       <div className="flex items-center gap-3">
//         <img
//           src="https://i.pravatar.cc/40"
//           alt="admin"
//           className="w-9 h-9 rounded-full"
//         />
//         <span className="text-sm font-medium">Admin</span>
//       </div>
//     </header>
//   );
// };

// export default Header;


import "./Header.css";

const Header = ({ title }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div className="admin-title-wrapper">
          <h1 className="admin-title">{title}</h1>
        </div>

        <div className="admin-user">
          <img
            src="https://i.pravatar.cc/40"
            alt="admin"
            className="admin-avatar"
          />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
