const data = 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6dFRfRzJlZlJfcnZ3OVM2NnpKNjhtSWc2X1RWdU84bkJPTXA4NFgwOU9tb1JEMm1jR3JPUmxTSDNMdHpiMzkyaGpFZy9leGVj';
let students = {};
let currentStudent = null;

fetch(atob(data))
    .then(res => res.json())
    .then(data => {
        students = data;
    })
    .catch(err => {
        console.error("Lỗi tải dữ liệu:", err);
        document.getElementById('errorMessage').textContent = 'Không thể tải dữ liệu!';
    });
