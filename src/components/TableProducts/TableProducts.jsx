import "../TableMembers/TableMembers.scss";

import React from "react";

const TableProducts = () => {
  return (
    <table className="table">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        <th>More...</th>
      </tr>
      <tr>
        <td>000001</td>
        <td>Phone</td>
        <td>200</td>
        <td>300$</td>
        <td>60.000$</td>
        <td>
          <button>More...</button>
        </td>
      </tr>
    </table>
  );
};

export default TableProducts;
