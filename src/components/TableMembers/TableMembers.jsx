import "./TableMembers.scss";

import React from "react";

const TableMembers = () => {
  return (
    <table className="table">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Tel</th>
        <th>Budget</th>
        <th>More...</th>
      </tr>
      <tr>
        <td>00001</td>
        <td>John Doe</td>
        <td>New York Time/st/7</td>
        <td>+123456789</td>
        <td>800$</td>
        <td>
          <button>More...</button>
        </td>
      </tr>
    </table>
  );
};

export default TableMembers;
