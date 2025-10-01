document.addEventListener("DOMContentLoaded", function () {
  const passwordForm = document.getElementById("password-form");
  const dashboardContent = document.getElementById("dashboard-content");
  const passwordInput = document.getElementById("password-input");
  const passwordSubmit = document.getElementById("password-submit");
  const errorMessage = document.getElementById("error-message");

  // Correct passwords array
  const correctPasswords = [
    "Sangeeta0608@#",
    "4ugmrnxxfu",
    "deepeshguptaresult",
    "resultwebpage",
  ];

  // Event listener for the submit button
  passwordSubmit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const enteredPassword = passwordInput.value;
    if (correctPasswords.includes(enteredPassword)) {
      passwordForm.style.display = "none"; // Use style property for direct hiding
      dashboardContent.classList.remove("hidden");
      initializeCharts(); // Call a function to initialize charts after content is visible
    } else {
      errorMessage.classList.remove("hidden");
    }
  });

  // Event listener for 'Enter' key press on the input field
  passwordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      passwordSubmit.click();
    }
  });

  // Function to initialize all charts
  function initializeCharts() {
    // Data for charts
    const sgpaData = {
      labels: [
        "Sem I",
        "Sem II",
        "Sem III",
        "Sem IV",
        "Sem V",
        "Sem VI",
        "Sem VII",
        "Sem VIII",
      ],
      datasets: [
        {
          label: "SGPA",
          data: [9.16, 8.86, 9.0, 7.8, 7.43, 8.83, 10.0, 9.33],
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          tension: 0.4,
        },
      ],
    };

    const marksData = {
      labels: [
        "Sem I",
        "Sem II",
        "Sem III",
        "Sem IV",
        "Sem V",
        "Sem VI",
        "Sem VII",
        "Sem VIII",
      ],
      datasets: [
        {
          label: "Total Marks Obtained",
          data: [606, 595, 431, 455, 350, 520, 95, 523],
          backgroundColor: "rgba(168, 85, 247, 0.8)",
        },
        {
          label: "Maximum Marks",
          data: [700, 700, 500, 600, 500, 600, 100, 600],
          backgroundColor: "rgba(99, 102, 241, 0.8)",
        },
      ],
    };

    // SGPA Chart
    const sgpaCtx = document.getElementById("sgpaChart").getContext("2d");
    new Chart(sgpaCtx, {
      type: "line",
      data: sgpaData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `SGPA: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            title: {
              display: true,
              text: "SGPA",
              color: "#d1d5db",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#d1d5db",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#d1d5db",
            },
          },
        },
      },
    });

    // Marks Chart
    const marksCtx = document.getElementById("marksChart").getContext("2d");
    new Chart(marksCtx, {
      type: "bar",
      data: marksData,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#d1d5db",
            },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            title: {
              display: true,
              text: "Marks",
              color: "#d1d5db",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#d1d5db",
            },
          },
        },
      },
    });
  }
});
