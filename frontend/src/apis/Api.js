import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5002/api/users";

// Function to register a new user
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Function to log in a user
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

// Function to add pricing information
export const addPricing = async (userData) => {
  return await axios.post(`${API_URL}/pricing`, userData);
};

// Function to add a practice task with form data, including files
export const addPracticeTask = async (formData) => {
  return await axios.post("http://localhost:5002/practiceTasks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Function to get all practice tasks
export const getPracticeTasks = async () => {
  return await axios.get("http://localhost:5002/practiceTasks");
};

// Function to delete a practice task by ID
export const deletePracticeTask = async (taskId) => {
  return await axios.delete(`http://localhost:5002/practiceTasks/${taskId}`);
};

// Function to add an audio question task with form data, including files
export const addAudioQuestion = async (formData) => {
  return await axios.post("http://localhost:5002/audioQuestions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Function to get all audio questions
export const getAudioQuestions = async () => {
  return await axios.get("http://localhost:5002/audioQuestions");
};

// Function to delete an audio question by ID
export const deleteAudioQuestion = async (taskId) => {
  return await axios.delete(`http://localhost:5002/audioQuestions/${taskId}`);
};

// Function to upload a profile picture
export const uploadProfilePicture = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:5002/api/users/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get the profile picture
export const getProfilePicture = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile-picture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.profileImageUrl;
  } catch (error) {
    throw error;
  }
};

// Function to get user details
export const getUserDetails = async (token) => {
  try {
    const response = await axios.get("http://localhost:5002/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to save a user response
export const saveUserResponse = async (token, responseData) => {
  try {
    const response = await axios.post(
      "http://localhost:5002/api/history/responses",
      responseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Response saved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error saving user response:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to get the user's practice history
export const getUserHistory = async (token) => {
  try {
    console.log("📢 Fetching user history...");

    const response = await axios.get(
      `http://localhost:5002/api/history/responses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ API Response (getUserHistory):", response.data);
    return response.data.data; // Ensure correct return format
  } catch (error) {
    console.error(
      "❌ Error fetching user history:",
      error.response?.data || error.message
    );
    throw error;
  }
};
