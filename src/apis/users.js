import axios from "axios";

const users = "/api/v1/users";

// Creates a team user
export const createTeamMember = payload => {
  return axios.post(users, payload);
};

//Get all active team members
export const getActiveMembers = () => {
  return axios.get(`${users}?active=true`);
};

//Get all inactive team members
export const getInactiveMembers = () => {
  return axios.get(`${users}?inactive=true`);
};

//Update status of a team member
export const setActivationStatus = (id, status) => {
  return axios.put(`${users}/${id}?active=${status}`);
};
