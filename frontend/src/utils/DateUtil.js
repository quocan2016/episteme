export function formatDate(inputDate) {
  if (inputDate === undefined) return null;
  // const date = new Date(inputDate);
  // const monthNames = [
  //    "Tháng 1",
  //    "Tháng 2",
  //    "Tháng 3",
  //    "Tháng 4",
  //    "Tháng 5",
  //    "Tháng 6",
  //    "Tháng 7",
  //    "Tháng 8",
  //    "Tháng 9",
  //    "Tháng 10",
  //    "Tháng 11",
  //    "Tháng 12",
  // ];

  // const monthName = monthNames[date.getMonth()];
  // const day = date.getDate();

  // const dateString = "10:13PM 30/07/2023";
  // return `${day} ${monthName}`;

  // Lấy thông tin về ngày và tháng từ đối tượng Date
  // const day = dateObject.getDate();
  // const month = dateObject.getMonth() + 1; // Tháng được đánh số từ 0 - 11, nên cần cộng thêm 1 để đạt tháng thực tế

  if (inputDate.split(" ").length > 0) {
    const [day, month, year] = inputDate.split(" ")[1].split("/");

    return day + " Tháng " + month;
  }
  return "";
}
