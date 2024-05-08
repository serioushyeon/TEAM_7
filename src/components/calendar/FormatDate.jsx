function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export default formatDate;
