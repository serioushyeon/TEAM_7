function formatDate(year, month, day) {
    // 월과 일이 한 자리 수일 때 앞에 0을 붙인다.
    const formattedMonth = month < 9 ? `0${month + 1}` : `${month + 1}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export default formatDate;