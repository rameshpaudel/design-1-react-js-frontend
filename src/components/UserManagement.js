import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./UserManagement.css"; // Import your CSS file
import {
  FileText,
  Pencil,
  PieChart,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import Sidebar from "./Sidebar";

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("User Management");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  // const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Adjust the number of users per page as needed

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/dashboard/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    console.log(newUser, "new User");

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/dashboard/user",
        {
          username: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (data) {
        setUsers([
          {
            ...newUser,
            username: newUser.name,
            id: users.length + 1,
            createdAt: new Date(),
          },
          ...users,
        ]);
        setIsAddModalOpen(false);
        setNewUser({ name: "", email: "", password: "", role: "user" });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add user. Please try again.");
    }
  };

  const handleEditUser = async () => {
    try {
      if (currentUser) {
        const { data } = await axios.put(
          `http://127.0.0.1:5000/dashboard/user/${currentUser?.id}`,
          {
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );

        if (data) {
          setUsers(
            users.map((user) =>
              user.id === currentUser.id ? currentUser : user
            )
          );
          setIsEditModalOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
      alert("Failed to edit user. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    if (currentUser) {
      try {
        await axios.delete(
          `http://127.0.0.1:5000/dashboard/user/${currentUser?.id}`
        );

        setUsers(users.filter((user) => user.id !== currentUser.id));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.log(error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  // const handleDelete = (email) => {
  //   const updatedUsers = users.filter((user) => user.email !== email);
  //   setUsers(updatedUsers);
  // };

  // const handleEdit = (email) => {
  //   const newEmail = prompt("Enter new email:", email);
  //   if (newEmail) {
  //     const updatedUsers = users.map((user) =>
  //       user.email === email ? { ...user, email: newEmail } : user
  //     );
  //     setUsers(updatedUsers);
  //   }
  // };

  // const handleAddUser = () => {
  //   if (newUser.name && newUser.email && newUser.password) {
  //     const updatedUsers = [...users, { ...newUser, id: users.length + 1 }]; // Add ID for new user
  //     setUsers(updatedUsers);
  //     setNewUser({ name: "", email: "", password: "" });
  //     setShowAddUserForm(false);
  //   } else {
  //     alert("Please fill in all fields.");
  //   }
  // };

  const handleButtonClick = (buttonName, route) => {
    navigate(route);
    setActiveButton(buttonName);
  };

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-[92vh] bg-gray-900 text-gray-100 font-sans flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage Registered Users</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            <Plus className="inline-block mr-2" /> Add User
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {currentUsers?.length > 0 &&
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors mr-2"
                        onClick={() => {
                          navigate(`/user/${user.id}/reports`);
                        }}
                      >
                        View Scan History
                      </button>
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="text-teal-400 hover:text-teal-300 mr-2"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-teal-600 text-sm font-medium text-white"
                // className={`page-button ${
                //   currentPage === index + 1 ? "active" : ""
                // }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            {/* <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-teal-600 text-sm font-medium text-white"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
            >
              3
            </a> */}
          </nav>
        </div>
      </main>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <input
              type="text"
              placeholder="Username"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-teal-500 text-white rounded-md"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              placeholder="Username"
              value={currentUser.username}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, username: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            />
            <select
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md mb-3"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="px-4 py-2 bg-teal-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Delete User</h3>
            <p className="mb-4">
              Are you sure you want to delete the user "{currentUser.username}"?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <main className="main-content">
        <h1>Manage Registered Users</h1>
        <p>Total Users: {users.length}</p>

        <button
          className="add-user-button"
          onClick={() => setShowAddUserForm(true)}
        >
          Add User
        </button>

        {showAddUserForm && (
          <div className="add-user-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <button className="add-user-button" onClick={handleAddUser}>
              Add
            </button>
            <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
          </div>
        )}

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user.email)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main> */}
    </div>
  );
};

export default UserManagement;
