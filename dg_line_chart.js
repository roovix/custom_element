function one_chart(
  bottom_label_data,
  main_data,
  top_label_name,
  hover_value_tag
) {
  // Sample Data for New Company
  const data = {
    labels: bottom_label_data,
    datasets: [
      {
        label: top_label_name,
        data: main_data, // Example dataset values
        borderColor: "rgba(34, 197, 94, 1)", // Main line color (green)
        backgroundColor: "rgba(34, 197, 94, 0.1)", // Fill area under the curve
        tension: 0.5, // Smooth curve
        fill: true, // Enable area fill under the line
        pointRadius: 4, // Point size
        pointBackgroundColor: "#ffffff", // Point background color
        pointBorderColor: "rgba(34, 197, 94, 1)", // Point border color
        pointHoverRadius: 10, // Hover effect radius
        pointHoverBackgroundColor: "#0D1117", // Hover effect background color
      },
    ],
  };

  // Chart Configuration
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hides legend (only one dataset)
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return ` Analytics: ${value}${hover_value_tag}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            drawBorder: false,
            color: "rgba(200, 200, 200, 0.1)",
          },
        },
        y: {
          grid: {
            drawBorder: false,
            color: "rgba(200, 200, 200, 0.1)",
          },
          ticks: {
            callback: function (value) {
              return `${value}${hover_value_tag}`; // Add "m" for million
            },
          },
        },
      },
      elements: {
        point: {
          borderWidth: 2, // Thickness of point border
          hoverBorderWidth: 3, // Border thickness when hovering
        },
      },
      // Change cursor to pointer when hovering over dots
      onHover: (event, chartElement) => {
        const canvas = event.native.target;
        canvas.style.cursor = chartElement.length ? "pointer" : "default";
      },
    },
  };

  // Render the Chart
  const ctx = document.getElementById("one_chart").getContext("2d");
  new Chart(ctx, config);
}
