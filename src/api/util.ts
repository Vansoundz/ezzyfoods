const setAuthHeader = (file: boolean = false) => {
  const token = localStorage._eat;
  if (!token) return {};
  return {
    headers: {
      "Content-Type": file ? "multipart/formdata" : "application/json",
      "ezzy-auth": token,
    },
  };
};

export { setAuthHeader };
