export const tokenAuthorization = () => {
  const token = localStorage.getItem("token_episteme");
  return `Bearer ${token}`;
};

// const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmpAZ21haWwuY29tIiwiaWF0IjoxNjkwOTY1MTEzLCJleHAiOjE2OTA5Njg3MTN9.st9wWinW1tWS8KFmh_0Yp835V9pIgololC8m8EbJgXs`;

// export const tokenAuthorization = `Bearer ${token}`;
