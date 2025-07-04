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

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const mssvInput = document.getElementById('mssv').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('errorMessage');

    const mssv = mssvInput.padStart(11, '0');

    if (students[mssv] && String(students[mssv].password).trim() === passwordInput) {
        currentStudent = students[mssv];
        currentStudent.avgGrade = calculateAverage(currentStudent.grades);
        showDashboard();
    } else {
        errorDiv.textContent = 'MSSV hoặc mật khẩu không đúng!';
    }
});

function calculateAverage(grades) {
    let total = 0, totalCoef = 0;
    grades.forEach(g => {
        const score = parseFloat(g.score);
        const coef = parseFloat(g.coefficient);
        if (!isNaN(score) && !isNaN(coef)) {
            total += score * coef;
            totalCoef += coef;
        }
    });
    return totalCoef ? (total / totalCoef).toFixed(2) : '0.00';
}

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    const s = currentStudent;
    const studentInfoDiv = document.getElementById('studentInfo');
    studentInfoDiv.innerHTML = `
        <div class="info-item"><span class="info-label">Họ và tên:</span><span class="info-value">${s.name}</span></div>
        <div class="info-item"><span class="info-label">Ngày sinh:</span><span class="info-value">${s.birthDate}</span></div>
        <div class="info-item"><span class="info-label">Giới tính:</span><span class="info-value">${s.gender}</span></div>
        <div class="info-item"><span class="info-label">Nơi sinh:</span><span class="info-value">${s.birthPlace}</span></div>
        <div class="info-item"><span class="info-label">Trình độ:</span><span class="info-value">${s.level}</span></div>
        <div class="info-item"><span class="info-label">Chuyên ngành:</span><span class="info-value">${s.major}</span></div>
        <div class="info-item"><span class="info-label">Lớp học:</span><span class="info-value">${s.class}</span></div>
        <div class="info-item"><span class="info-label">Khóa học:</span><span class="info-value">${s.course}</span></div>
    `;

    const gradesTableBody = document.getElementById('gradesTableBody');
    gradesTableBody.innerHTML = '';
    s.grades.forEach(grade => {
        const score = parseFloat(grade.score);
        const coef = parseFloat(grade.coefficient);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grade.stt || '-'}</td>
            <td style="text-align:left">${grade.subject || '-'}</td>
            <td>${isNaN(coef) ? '-' : coef}</td>
            <td class="grade-score">${isNaN(score) ? '-' : score.toFixed(1)}</td>
        `;
        gradesTableBody.appendChild(row);
    });

    document.getElementById('avgGrade').textContent = s.avgGrade;
    document.getElementById('classification').textContent = getClassification(s.avgGrade);
}

function logout() {
    currentStudent = null;
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('loginForm').reset();
    document.getElementById('errorMessage').textContent = '';
}

function changeFormat() {
    const body = document.body;
    const isDark = body.style.background.includes('#2d3748');
    body.style.background = isDark
        ? '#2d3c93'
        : 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)';
}