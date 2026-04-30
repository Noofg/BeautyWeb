import axios from "axios";

const BRANCHES_API_URL = `${process.env.REACT_APP_API_URL}/api/branches`;

export const fetchBranches = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${BRANCHES_API_URL}/getListBranches`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createBranch = async (branchData) => {
  const token = localStorage.getItem("token");
  return await axios.post(BRANCHES_API_URL, branchData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
