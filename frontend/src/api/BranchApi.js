
import api from "./api"; 
const BRANCHES_API_URL = `${process.env.REACT_APP_API_URL}/api/branches`;

export const fetchBranches = async () => {
  return await api.get(`${BRANCHES_API_URL}/getListBranches`);
};

export const createBranch = async (branchData) => {
  return await api.post(BRANCHES_API_URL, branchData);
};
