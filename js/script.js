document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  //   ссылка на элементы, на которые будем вещать события или рендерить контент
  const table = document.getElementById("dataTable");
  const searchInput = document.getElementById("searchInput");
  const tableHeader = document.querySelectorAll("#dataTable th");
  // создадим переменную data для записи данных, полученных при запросе
  let data = [];
  console.log(data);
  // функция-запрос для задания 02
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      data = await response.json();
      table.classList.remove("loading");
      renderTable(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  //функция для рендера таблицы на основании полученных данных
  function renderTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = data
      .map(
        (row) => `
      <tr>
        <td>${row.id}</td>
        <td>${row.userId}</td>
        <td>${row.title}</td>
        <td>${row.body}</td>
      </tr>
    `
      )
      .join("");
  }

  tableHeader.forEach((header) => {
    header.addEventListener("click", function () {
      const column = this.getAttribute("data-column");
      const order = this.getAttribute("data-order");
      const newOrder = order === "asc" ? "desc" : "asc";
      this.setAttribute("data-order", newOrder);

      const sortedData = [...data].sort((a, b) => {
        if (typeof a[column] === "number" && typeof b[column] === "number") {
          return order === "asc"
            ? a[column] - b[column]
            : b[column] - a[column];
        } else {
          return order === "asc"
            ? a[column].localeCompare(b[column])
            : b[column].localeCompare(a[column]);
        }
      });

      renderTable(sortedData);
    });
  });
  // функция поиска по введенному тексту
  function searchByText() {
    // приводим введенный текст к нижнему регистру
    const searchText = this.value.toLowerCase();
    // если текст от 3х букв и более, то происходит поиск
    if (searchText.length >= 3) {
      const filteredData = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText) ||
          item.body.toLowerCase().includes(searchText)
      );
      renderTable(filteredData);
    } else {
      renderTable(data);
    }
  }
  // вешаем событие "input" на поле поиска
  searchInput.addEventListener("input", searchByText);
});
