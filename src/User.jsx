import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "./userSlice";
import { increment } from "./counterSlice"; 
import { fetchUsers ,getIsUsersLoading,getIsUsersError, getUsers} from "./userSlice";


const UserTable = () => {
  const dispatch = useDispatch();
 const users = useSelector(getUsers);
const loading = useSelector(getIsUsersLoading);
const error = useSelector(getIsUsersError);
const count = useSelector((state) => state.counter.value); 

  useEffect(() => {
   
   dispatch( fetchUsers());
  }, [dispatch]);

  return (
   <div>
<h2>counter:{count}</h2>
<button onClick={() => dispatch(increment())}>
        Increment
      </button>
      <br></br>
      <br></br>
        {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default UserTable;