// this function formats day
function formatDate(index) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);
    // Added index to current date to get the date for each day
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    return formattedDate
}


export { formatDate }